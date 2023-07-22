import { Order } from '../models/Order';
import { Pizza } from '../models/Pizza';
import { User } from '../models/User';
import { createOrder } from '../services/order';
import { createPizza } from '../services/pizza';
import { createUser } from '../services/user';
import { IOrder, IPizza } from '../types';

export const cleanUp = async () => {
    await Pizza.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();
};

export const createAdminAccount = async () => {
    await createUser('admin@admin.com', 'admin', 'admin');
};

export const createUserAccount = async () => {
    await createUser('user@user.com', 'user', 'user');
};

export const createPizzas = async () => {
    for (let i = 0; i < 3; i++) {
        const { name, ingredients, prices } = pizzas[i];
        await createPizza(name, ingredients, prices);
    }
};

export const createOrders = async () => {
    for (let i = 0; i < 2; i++) {
        const { userId, deliveryDetails, pizzas } = orders[i];
        await createOrder(userId, pizzas, deliveryDetails, 'preparing');
    }
};

export const adminInput = {
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin',
};

export const userInput = {
    email: 'user@user.com',
    password: 'user',
    role: 'user',
};

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
    {
        id: 3,
        name: 'Hawaiian',
        ingredients: 'tomato sauce, mozzarella cheese, pineapple',
        prices: {
            small: 28,
            medium: 38,
            large: 48,
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
