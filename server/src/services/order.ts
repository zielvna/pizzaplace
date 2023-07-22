import { Order } from '../models/Order';
import { Pizza } from '../models/Pizza';
import { CreateOrderPizzaSchemaRequestBody } from '../schemas/order';
import { IDeliveryDetails } from '../types';

export const createOrder = async (
    userId: number,
    pizzas: CreateOrderPizzaSchemaRequestBody[],
    deliveryDetails: IDeliveryDetails,
    status: 'preparing' | 'in delivery' | 'delivered'
) => {
    const parsedPizzas = [];

    for (let i = 0; i < pizzas.length; i++) {
        const { id, size, dough, amount } = pizzas[i];
        const pizza = await Pizza.findOne({ id });

        if (!pizza) {
            return null;
        }

        parsedPizzas.push({
            name: pizza.name,
            ingredients: pizza.ingredients,
            size,
            dough,
            amount,
            price: pizza.prices[size],
            totalPrice: pizza.prices[size] * amount,
        });
    }

    let totalPrice = 0;

    for (let i = 0; i < parsedPizzas.length; i++) {
        totalPrice += parsedPizzas[i].totalPrice;
    }

    const lastOrder = await Order.findOne().sort({ _id: -1 });
    let currentId = 1;

    if (lastOrder) {
        currentId = lastOrder.id + 1;
    }

    const order = new Order({
        id: currentId,
        userId: userId,
        pizzas: parsedPizzas,
        deliveryDetails,
        totalPrice,
        status: status,
    });

    await order.save();

    return order;
};
