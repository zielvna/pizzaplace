import { cookies } from 'next/headers';
import { IOrder, IPizza, IUser } from '../types';
import { getAllOrders, getPizzas, getSetup, getUser } from './api';

export function getSession() {
    const cookieStore = cookies();
    const session = cookieStore.get('connect.sid');

    return session?.value ?? null;
}

export async function fetchUser() {
    const session = getSession();

    if (session) {
        const response = await getUser(session);

        return (response?.data?.user as IUser) ?? null;
    }

    return null;
}

export async function fetchSetup() {
    const response = await getSetup();

    return response?.status === 'success';
}

export async function fetchPizzas() {
    const response = await getPizzas();

    return (response?.data?.pizzas ?? []) as IPizza[];
}

export async function fetchOrders() {
    const session = getSession();

    if (session) {
        const response = await getAllOrders(session);

        return (response?.data?.orders ?? []) as IOrder[];
    }

    return [] as IOrder[];
}
