import { RequestHandler } from 'express';
import { User } from '../models/User';

export const checkSetup: RequestHandler = async (req, res, next) => {
    const users = await User.findOne({ role: 'admin' });

    if (!users) {
        return res.status(503).send({ status: 'error', message: 'Setup is not completed' });
    }

    next();
};
