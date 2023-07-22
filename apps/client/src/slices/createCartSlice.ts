import { StateCreator } from 'zustand';
import { ICartPizza } from '../types';

export interface ICartSlice {
    pizzas: ICartPizza[];
    addToCart: (pizza: ICartPizza) => void;
    removeFromCart: (id: number) => void;
    changeAmount: (id: number, amount: number) => void;
    clearCart: () => void;
}

export const createCartSlice: StateCreator<ICartSlice> = (set, get) => ({
    pizzas: [],
    addToCart: (pizza: ICartPizza) => {
        const pizzas = get().pizzas;
        set({ pizzas: [...pizzas, pizza] });
    },
    removeFromCart: (id: number) => {
        const pizzas = get().pizzas;
        set({ pizzas: pizzas.filter((pizza) => pizza.id !== id) });
    },
    changeAmount: (id: number, amount: number) => {
        const pizzas = get().pizzas;
        set({ pizzas: pizzas.map((pizza) => (pizza.id === id ? { ...pizza, amount } : pizza)) });
    },
    clearCart: () => {
        set({ pizzas: [] });
    },
});
