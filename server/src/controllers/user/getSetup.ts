import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const getSetup: RequestHandler = async (req, res) => {
    const users = await User.findOne({ role: 'admin' });

    if (!users) {
        return res.status(503).send({ status: 'error', message: 'Setup is not completed' });
    }

    res.status(200).send({ status: 'success', message: 'Setup is completed' });
};
