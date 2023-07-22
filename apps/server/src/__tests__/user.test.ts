import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { createApp } from '../app';
import { cleanUp, createAdminAccount, createUserAccount, userInput } from './utils';

let app: Application;

const changePasswordInput = {
    password: 'user',
    newPassword: 'notuser',
};

describe('user', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        app = createApp(uuidv4(), mongoServer.getUri(), '');
    });

    beforeEach(async () => {
        await cleanUp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('register route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).post('/api/register').send(userInput);

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).post('/api/register').send({});

            expect(statusCode).toBe(429);
        });

        it('returns 409 if account with that email is already registered', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { statusCode } = await supertest(app).post('/api/register').send(userInput);

            expect(statusCode).toBe(409);
        });

        it('returns 201, cookie and user if successfully registered', async () => {
            await createAdminAccount();

            const { body, headers, statusCode } = await supertest(app).post('/api/register').send(userInput);

            expect(statusCode).toBe(201);
            expect(headers['set-cookie']).toBeDefined();
            expect(body.data.user).toBeDefined();
        });
    });

    describe('login route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).post('/api/login').send(userInput);

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { statusCode } = await supertest(app).post('/api/login').send({});

            expect(statusCode).toBe(429);
        });

        it('returns 403 if password is wrong', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { statusCode } = await supertest(app)
                .post('/api/login')
                .send({ ...userInput, password: 'notuser' });

            expect(statusCode).toBe(403);
        });

        it('returns 201, cookie and user if successfully logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { body, headers, statusCode } = await supertest(app).post('/api/login').send(userInput);

            expect(statusCode).toBe(200);
            expect(headers['set-cookie']).toBeDefined();
            expect(body.data.user).toBeDefined();
        });
    });

    describe('logout route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).get('/api/logout');

            expect(statusCode).toBe(503);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { statusCode } = await supertest(app).get('/api/logout');

            expect(statusCode).toBe(401);
        });

        it('returns 200 and makes session inactive if user is logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            await supertest(app).post('/api/register').send(userInput);
            const login = await supertest(app).post('/api/login').send(userInput);
            const logout1 = await supertest(app).get('/api/logout').set('Cookie', [login.headers['set-cookie']]);
            const logout2 = await supertest(app).get('/api/logout').set('Cookie', [login.headers['set-cookie']]);

            expect(logout1.statusCode).toBe(200);
            expect(logout2.statusCode).toBe(401);
        });
    });

    describe('change password route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).post('/api/change-password').send(changePasswordInput);

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .post('/api/change-password')
                .set('Cookie', [headers['set-cookie']])
                .send({});

            expect(statusCode).toBe(429);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).post('/api/change-password').send(changePasswordInput);

            expect(statusCode).toBe(401);
        });

        it('returns 403 if passwords do not match', async () => {
            await createAdminAccount();
            await createUserAccount();

            await supertest(app).post('/api/register').send(userInput);
            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .post('/api/change-password')
                .set('Cookie', [headers['set-cookie']])
                .send({ ...changePasswordInput, password: 'notuser' });

            expect(statusCode).toBe(403);
        });

        it('returns 200 if password is successfully changed', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .post('/api/change-password')
                .set('Cookie', [headers['set-cookie']])
                .send(changePasswordInput);

            expect(statusCode).toBe(200);
        });
    });

    describe('get user route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).get('/api/user');

            expect(statusCode).toBe(503);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).get('/api/user');

            expect(statusCode).toBe(401);
        });

        it('returns 200 and user data if user is logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { body, statusCode } = await supertest(app).get('/api/user').set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
            const { password, ...otherUserInput } = userInput;
            expect(body.data.user).toMatchObject(otherUserInput);
        });
    });

    describe('get setup route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).get('/api/setup');

            expect(statusCode).toBe(503);
        });

        it('returns 200 if admin account is registered', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).get('/api/setup');

            expect(statusCode).toBe(200);
        });
    });
});
