import { ICartPizza, IOrder, IPizza, IUser } from '../types';

export const admin: IUser = {
    id: 1,
    email: 'admin@admin.com',
    role: 'admin',
};

export const user: IUser = {
    id: 2,
    email: 'user@user.com',
    role: 'user',
};

export const cartPizzas: ICartPizza[] = [
    {
        id: 1,
        name: 'Margherita',
        ingredients: 'tomato sauce, mozzarella cheese',
        size: 'medium',
        dough: 'thin',
        amount: 2,
        price: 42,
    },
    {
        id: 2,
        name: 'Pepperoni',
        ingredients: 'tomato sauce, mozzarella cheese, pepperoni',
        size: 'large',
        dough: 'thick',
        amount: 1,
        price: 46,
    },
];

export const pizzas: IPizza[] = [
    {
        id: 1,
        name: 'Margherita',
        ingredients: 'tomato sauce, mozzarella cheese',
        prices: {
            small: 32,
            medium: 42,
            large: 52,
        },
    },
    {
        id: 2,
        name: 'Pepperoni',
        ingredients: 'tomato sauce, mozzarella cheese, pepperoni',
        prices: {
            small: 36,
            medium: 46,
            large: 56,
        },
    },
];

export const orders: IOrder[] = [
    {
        id: 1,
        userId: 1,
        deliveryDetails: {
            name: 'Test',
            phoneNumber: '123456789',
            street: 'Test',
            houseNumber: '1',
            city: 'Test',
        },
        pizzas: [
            {
                id: 1,
                name: 'Margherita',
                ingredients: 'tomato sauce, mozzarella cheese',
                size: 'small',
                dough: 'thin',
                price: 32,
                amount: 2,
                totalPrice: 64,
            },
        ],
        totalPrice: 64,
        status: 'delivered',
    },
    {
        id: 2,
        userId: 2,
        deliveryDetails: {
            name: 'Test',
            phoneNumber: '123456789',
            street: 'Test',
            houseNumber: '2',
            city: 'Test',
        },
        pizzas: [
            {
                id: 1,
                name: 'Margherita',
                ingredients: 'tomato sauce, mozzarella cheese',
                size: 'medium',
                dough: 'thin',
                price: 42,
                amount: 2,
                totalPrice: 84,
            },
            {
                id: 2,
                name: 'Pepperoni',
                ingredients: 'tomato sauce, mozzarella cheese, pepperoni',
                size: 'large',
                dough: 'thick',
                price: 56,
                amount: 1,
                totalPrice: 56,
            },
        ],
        totalPrice: 140,
        status: 'preparing',
    },
];
