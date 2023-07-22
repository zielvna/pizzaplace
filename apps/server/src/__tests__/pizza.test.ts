import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { createApp } from '../app';
import { adminInput, cleanUp, createAdminAccount, createPizzas, createUserAccount, userInput } from './utils';

let app: Application;

const createPizzaInput = {
    name: 'Margherita',
    ingredients: 'tomato sauce, mozzarella cheese',
    prices: {
        small: 32,
        medium: 42,
        large: 52,
    },
};

const editPizzaInput = {
    id: 1,
    name: 'Margherita',
    ingredients: 'tomato saurce, cheddar cheese',
    prices: {
        small: 36,
        medium: 42,
        large: 52,
    },
};

const deletePizzaInput = {
    id: 1,
};

describe('pizza', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        app = createApp(uuidv4(), mongoServer.getUri(), '');
    });

    afterEach(async () => {
        await cleanUp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('create pizza route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).post('/api/pizza');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .post('/api/pizza')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .post('/api/pizza')
                .send(createPizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(401);
        });

        it('returns 201 if pizza is successfully created', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .post('/api/pizza')
                .send(createPizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(201);
        });
    });

    describe('edit pizza route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).patch('/api/pizza');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/pizza')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 404 if pizza does not exist', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/pizza')
                .send(editPizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(404);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .patch('/api/pizza')
                .send(editPizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(401);
        });

        it('returns 200 if pizza is successfully edited', async () => {
            await createAdminAccount();
            await createPizzas();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/pizza')
                .send(editPizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
        });
    });

    describe('delete pizza route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).delete('/api/pizza');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/pizza')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 404 if pizza does not exist', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/pizza')
                .send(deletePizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(404);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { statusCode } = await supertest(app)
                .delete('/api/pizza')
                .send(deletePizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(401);
        });

        it('returns 200 if pizza is successfully deleted', async () => {
            await createAdminAccount();
            await createPizzas();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/pizza')
                .send(deletePizzaInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
        });
    });

    describe('get pizzas route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).get('/api/pizzas');

            expect(statusCode).toBe(503);
        });

        it('returns 200 and empty array if there are no pizzas', async () => {
            await createAdminAccount();

            const { body, statusCode } = await supertest(app).get('/api/pizzas');

            expect(statusCode).toBe(200);
            expect(body.data.pizzas).toEqual([]);
        });

        it('returns 200 and array with pizzas if there are pizzas', async () => {
            await createAdminAccount();
            await createPizzas();

            const { body, statusCode } = await supertest(app).get('/api/pizzas');

            expect(statusCode).toBe(200);
            expect(body.data.pizzas).toBeDefined();
            expect(body.data.pizzas.length).toEqual(3);
        });
    });
});
