import { cookies } from 'next/headers';
import { IOrder, IPizza, IUser } from '../types';
import { getAllOrders, getPizzas, getSetup, getUser } from './api';

export const getSessionCookie = () => {
    const cookieStore = cookies();
    const session = cookieStore.get('connect.sid');

    return session?.value ?? null;
};

export const fetchUser = async () => {
    const sessionCookie = getSessionCookie();

    if (sessionCookie) {
        const response = await getUser(sessionCookie);

        return (response?.data?.user as IUser) ?? null;
    }

    return null;
};

export const fetchSetup = async () => {
    const response = await getSetup();

    return response?.status === 'success';
};

export const fetchPizzas = async () => {
    const response = await getPizzas();

    return (response?.data?.pizzas ?? []) as IPizza[];
};

export const fetchOrders = async () => {
    const sessionCookie = getSessionCookie();

    if (sessionCookie) {
        const response = await getAllOrders(sessionCookie);

        return (response?.data?.orders ?? []) as IOrder[];
    }

    return [] as IOrder[];
};
