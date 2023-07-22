import { genSaltSync, hashSync } from 'bcrypt';
import { User } from '../models/User';

export const createUser = async (email: string, password: string, role: 'user' | 'admin') => {
    const lastUser = await User.findOne().sort({ _id: -1 });
    let currentId = 1;

    if (lastUser) {
        currentId = lastUser.id + 1;
    }

    const user = new User({
        id: currentId,
        email,
        password: hashSync(password, genSaltSync(10)),
        role: role,
    });

    await user.save();

    return user;
};
