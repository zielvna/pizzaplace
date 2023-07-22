import { create } from 'zustand';
import { ICartSlice, createCartSlice } from './slices/createCartSlice';
import { IUserSlice, createUserSlice } from './slices/createUserSlice';

type StoreState = ICartSlice & IUserSlice;

export const useStore = create<StoreState>()((...a) => ({
    ...createCartSlice(...a),
    ...createUserSlice(...a),
}));
