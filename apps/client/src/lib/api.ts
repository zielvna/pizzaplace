import { IDeliveryDetails, IOrderPizza } from '../types';

const fetchApi = async (path: string, method: string, body?: object, session?: string) => {
    let additionalHeaders = {};

    if (session) {
        additionalHeaders = { Cookie: `connect.sid=${session}` };
    }

    let response;

    try {
        response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`, {
            method: method,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...additionalHeaders,
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });
    } catch {
        return (await response?.json()) ?? null;
    }

    return await response?.json();
};

export const getSetup = async () => {
    return await fetchApi('api/setup', 'GET');
};

export const register = async (email: string, password: string, role: 'user' | 'admin') => {
    return await fetchApi('api/register', 'POST', { email, password, role });
};

export const login = async (email: string, password: string, role: 'user' | 'admin') => {
    return await fetchApi('api/login', 'POST', { email, password, role });
};

export const logout = async () => {
    return await fetchApi('api/logout', 'GET');
};

export const changePassword = async (password: string, newPassword: string) => {
    return await fetchApi('api/change-password', 'POST', { password, newPassword });
};

export const getUser = async (session?: string) => {
    return await fetchApi('api/user', 'GET', undefined, session);
};

export const createPizza = async (
    name: string,
    ingredients: string,
    prices: { small: number; medium: number; large: number }
) => {
    return await fetchApi('api/pizza', 'POST', { name, ingredients, prices });
};

export const editPizza = async (
    id: number,
    name: string,
    ingredients: string,
    prices: { small: number; medium: number; large: number }
) => {
    return await fetchApi('api/pizza', 'PATCH', { id, name, ingredients, prices });
};

export const deletePizza = async (id: number) => {
    return await fetchApi('api/pizza', 'DELETE', { id });
};

export const getPizzas = async () => {
    return await fetchApi('api/pizzas', 'GET');
};

export const createOrder = async (pizzas: IOrderPizza[], deliveryDetails: IDeliveryDetails) => {
    return await fetchApi('api/order', 'POST', { pizzas, deliveryDetails });
};

export const editOrder = async (id: number, status: string) => {
    return await fetchApi('api/order', 'PATCH', { id, status });
};

export const deleteOrder = async (id: number) => {
    return await fetchApi('api/order', 'DELETE', { id });
};

export const getOrders = async () => {
    return await fetchApi('api/orders', 'GET');
};

export const getAllOrders = async (session?: string) => {
    return await fetchApi('api/orders?type=all', 'GET', undefined, session);
};
