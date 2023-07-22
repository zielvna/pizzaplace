import compression from 'compression';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { IUser } from './models/User';
import { orderRouter } from './routes/order';
import { pizzaRouter } from './routes/pizza';
import { userRouter } from './routes/user';

declare module 'express-session' {
    export interface SessionData {
        user?: IUser;
    }
}

export const createApp = (sessionSecret: string, mongoUrl: string, clientUrl: string) => {
    const app = express();

    app.use(cors({ origin: clientUrl, credentials: true }));
    app.use(compression());
    app.use(express.json());
    app.use(
        session({
            secret: sessionSecret,
            store: MongoStore.create({ mongoUrl: mongoUrl }),
            saveUninitialized: false,
            resave: false,
        })
    );

    app.use('/api', orderRouter);
    app.use('/api', pizzaRouter);
    app.use('/api', userRouter);

    return app;
};
