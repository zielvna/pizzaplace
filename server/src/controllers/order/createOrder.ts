import { RequestHandler } from 'express';
import { CreateOrderRequestBody } from '../../schemas/order';
import { createOrder as createOrderService } from '../../services/order';

export const createOrder: RequestHandler = async (req, res) => {
    const { pizzas, deliveryDetails }: CreateOrderRequestBody = req.body;

    try {
        const order = await createOrderService(req.session.user?.id ?? 0, pizzas, deliveryDetails, 'preparing');

        if (!order) {
            return res.status(404).send({ status: 'error', message: 'Pizza not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(201).send({ status: 'success', message: 'Order successfully created' });
};
