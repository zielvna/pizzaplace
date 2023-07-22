import { StateCreator } from 'zustand';
import { IUser } from '../types';

export interface IUserSlice {
    user: IUser | null | undefined;
    setUser: (user: IUser | null) => void;
}

export const createUserSlice: StateCreator<IUserSlice> = (set, get) => ({
    user: undefined,
    setUser: (user: IUser | null) => {
        set({ user });
    },
});
