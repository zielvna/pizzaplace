import { compareSync } from 'bcrypt';
import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { LoginRequestBody } from '../../schemas/user';

export const login: RequestHandler = async (req, res) => {
    const { email, password, role }: LoginRequestBody = req.body;

    const user = await User.findOne({ email, role });

    if (!user || !compareSync(password, user.password)) {
        return res.status(403).send({ status: 'error', message: 'Invalid e-mail or password' });
    }

    req.session.user = user;

    res.status(200).send({ status: 'success', message: 'Account successfully logged in', data: { user } });
};
