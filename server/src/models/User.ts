import { Document, Model, Schema, model } from 'mongoose';

export interface IUser extends Document {
    id: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

interface IUserModel extends Model<IUser> {}

const schema = new Schema<IUser>({
    id: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
});

export const User: IUserModel = model<IUser, IUserModel>('User', schema);
