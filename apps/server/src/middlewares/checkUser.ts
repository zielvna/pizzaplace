import { RequestHandler } from 'express';

export const checkUser: RequestHandler = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send({ status: 'error', message: 'You are not logged in' });
    }

    next();
};
