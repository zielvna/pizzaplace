import { RequestHandler } from 'express';

export const checkAdmin: RequestHandler = async (req, res, next) => {
    if (req.session.user?.role !== 'admin') {
        return res.status(401).send({ status: 'error', message: 'You are not an admin' });
    }

    next();
};
