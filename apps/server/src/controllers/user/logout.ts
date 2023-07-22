import { RequestHandler } from 'express';

export const logout: RequestHandler = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(400).send({ status: 'error', message: 'Error while trying to logout' });
        } else {
            res.status(200).send({ status: 'success', message: 'Account successfully logged out' });
        }
    });
};
