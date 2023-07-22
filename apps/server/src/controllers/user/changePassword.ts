import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RequestHandler } from 'express';
import { User } from '../../models/User';
import { ChangePasswordRequestBody } from '../../schemas/user';

export const changePassword: RequestHandler = async (req, res) => {
    const { password, newPassword }: ChangePasswordRequestBody = req.body;

    const user = await User.findOne({ id: req.session.user?.id });

    if (!user || !compareSync(password, user.password)) {
        return res.status(403).send({ status: 'error', message: 'Invalid password' });
    }

    try {
        await User.updateOne({ id: req.session.user?.id }, { password: hashSync(newPassword, genSaltSync(10)) });
    } catch (e) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(200).send({ status: 'success', message: 'Password successfully changed' });
};
