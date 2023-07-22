import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { createApp } from '../app';
import {
    adminInput,
    cleanUp,
    createAdminAccount,
    createOrders,
    createPizzas,
    createUserAccount,
    userInput,
} from './utils';

let app: Application;

const createOrderInput = {
    pizzas: [
        {
            id: 1,
            size: 'small',
            dough: 'thin',
            amount: 1,
        },
        {
            id: 2,
            size: 'large',
            dough: 'thick',
            amount: 2,
        },
    ],
    deliveryDetails: {
        name: 'Test',
        phoneNumber: '123456789',
        street: 'Test',
        houseNumber: '1',
        city: 'Test',
    },
};

const editOrderInput = {
    id: 1,
    status: 'in delivery',
};

const deleteOrderInput = {
    id: 1,
};

describe('order', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
        app = createApp(uuidv4(), mongoServer.getUri());
    });

    afterEach(async () => {
        await cleanUp();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('create order route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).post('/api/order');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .post('/api/order')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).post('/api/order').send(createOrderInput);

            expect(statusCode).toBe(401);
        });

        it('returns 404 if pizza does not exist', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .post('/api/order')
                .send(createOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(404);
        });

        it('returns 201 if order is successfully created', async () => {
            await createAdminAccount();
            await createPizzas();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .post('/api/order')
                .send(createOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(201);
        });
    });

    describe('edit order route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).patch('/api/order');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/order')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 404 if order does not exist', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/order')
                .send(editOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(404);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).patch('/api/order').send(createOrderInput);
            expect(statusCode).toBe(401);
        });

        it('returns 200 if order is successfully edited', async () => {
            await createAdminAccount();
            await createPizzas();
            await createOrders();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .patch('/api/order')
                .send(editOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
        });
    });

    describe('delete order route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).delete('/api/order');

            expect(statusCode).toBe(503);
        });

        it('returns 429 if data is invalid', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/order')
                .send({})
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(429);
        });

        it('returns 404 if order does not exist', async () => {
            await createAdminAccount();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/order')
                .send(deleteOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(404);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).delete('/api/order').send(deleteOrderInput);
            expect(statusCode).toBe(401);
        });

        it('returns 200 if order is successfully deleted', async () => {
            await createAdminAccount();
            await createPizzas();
            await createOrders();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);
            const { statusCode } = await supertest(app)
                .delete('/api/order')
                .send(deleteOrderInput)
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
        });
    });

    describe('get orders route', () => {
        it('returns 503 if admin account is not registered', async () => {
            const { statusCode } = await supertest(app).get('/api/orders');

            expect(statusCode).toBe(503);
        });

        it('returns 401 if user is not logged in', async () => {
            await createAdminAccount();

            const { statusCode } = await supertest(app).get('/api/orders');
            expect(statusCode).toBe(401);
        });

        it('returns 200 and empty array if there are no orders', async () => {
            await createAdminAccount();
            await createUserAccount();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { body, statusCode } = await supertest(app).get('/api/orders').set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
            expect(body.data.orders).toStrictEqual([]);
        });

        it('returns 200 and array with orders made by user if user role is user', async () => {
            await createAdminAccount();
            await createUserAccount();
            await createPizzas();
            await createOrders();

            const { headers } = await supertest(app).post('/api/login').send(userInput);
            const { body, statusCode } = await supertest(app).get('/api/orders').set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
            expect(body.data.orders.length).toBe(1);
        });

        it('returns 200 and array with all orders if user role is admin and type param is equal to all', async () => {
            await createAdminAccount();
            await createUserAccount();
            await createPizzas();
            await createOrders();

            const { headers } = await supertest(app).post('/api/login').send(adminInput);

            const { body, statusCode } = await supertest(app)
                .get('/api/orders?type=all')
                .set('Cookie', [headers['set-cookie']]);

            expect(statusCode).toBe(200);
            expect(body.data.orders.length).toBe(2);
        });
    });
});
