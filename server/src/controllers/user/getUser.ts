import { RequestHandler } from 'express';
import { User } from '../../models/User';

export const getUser: RequestHandler = async (req, res) => {
    const user = await User.findOne({ id: req.session.user?.id });

    if (!user) {
        return res.status(404).send({ status: 'error', message: 'User not found' });
    }

    const { password: _, ...parsedUser } = user.toObject();

    res.status(200).send({ status: 'success', data: { user: parsedUser } });
};
