import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { RegisterRequestBody } from '../../schemas/user';
import { createUser } from '../../services/user';

export const register: RequestHandler = async (req, res) => {
    const { email, password, role }: RegisterRequestBody = req.body;

    const users = await User.findOne({ role: 'admin' });

    if (role === 'user' && !users) {
        return res.status(503).send({ status: 'error', message: 'Setup is not completed' });
    }

    const isEmailTaken = await User.findOne({ email, role });

    if (isEmailTaken) {
        return res.status(409).send({ status: 'error', message: 'Account with this e-mail is already registered' });
    }

    if (role === 'admin') {
        const users = await User.findOne({ role: 'admin' });

        if (users) {
            return res.status(409).send({ status: 'error', message: 'Admin account already exists' });
        }
    }

    let user;

    try {
        user = await createUser(email, password, role);
    } catch (e) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    req.session.user = user;

    res.status(201).send({ status: 'success', message: 'Account successfully registered', data: { user } });
};
