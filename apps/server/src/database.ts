import mongoose from 'mongoose';

export const createDatabase = (mongoUrl: string) => {
    mongoose.connect(mongoUrl);
};
