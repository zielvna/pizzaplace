import { IDeliveryDetails, IOrderPizza } from '../types';

const fetchApi = async (
    path: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Record<string, unknown>,
    session?: string
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${path}`, {
            method: method,
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(session && { Cookie: `connect.sid=${session}` }),
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        return await response.json();
    } catch {
        return null;
    }
};

export const getSetup = () => {
    return fetchApi('api/setup', 'GET');
};

export const register = (email: string, password: string, role: 'user' | 'admin') => {
    return fetchApi('api/register', 'POST', { email, password, role });
};

export const login = (email: string, password: string, role: 'user' | 'admin') => {
    return fetchApi('api/login', 'POST', { email, password, role });
};

export const logout = () => {
    return fetchApi('api/logout', 'GET');
};

export const changePassword = (password: string, newPassword: string) => {
    return fetchApi('api/change-password', 'POST', { password, newPassword });
};

export const getUser = (session?: string) => {
    return fetchApi('api/user', 'GET', undefined, session);
};

export const createPizza = (
    name: string,
    ingredients: string,
    prices: { small: number; medium: number; large: number }
) => {
    return fetchApi('api/pizza', 'POST', { name, ingredients, prices });
};

export const editPizza = (
    id: number,
    name: string,
    ingredients: string,
    prices: { small: number; medium: number; large: number }
) => {
    return fetchApi('api/pizza', 'PATCH', { id, name, ingredients, prices });
};

export const deletePizza = (id: number) => {
    return fetchApi('api/pizza', 'DELETE', { id });
};

export const getPizzas = () => {
    return fetchApi('api/pizzas', 'GET');
};

export const createOrder = (pizzas: IOrderPizza[], deliveryDetails: IDeliveryDetails) => {
    return fetchApi('api/order', 'POST', { pizzas, deliveryDetails });
};

export const editOrder = (id: number, status: string) => {
    return fetchApi('api/order', 'PATCH', { id, status });
};

export const deleteOrder = (id: number) => {
    return fetchApi('api/order', 'DELETE', { id });
};

export const getOrders = () => {
    return fetchApi('api/orders', 'GET');
};

export const getAllOrders = (session?: string) => {
    return fetchApi('api/orders?type=all', 'GET', undefined, session);
};
