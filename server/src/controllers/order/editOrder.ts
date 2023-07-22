import { RequestHandler } from 'express';
import { Order } from '../../models/Order';
import { EditOrderRequestBody } from '../../schemas/order';

export const editOrder: RequestHandler = async (req, res) => {
    const { id, status }: EditOrderRequestBody = req.body;

    try {
        const { matchedCount } = await Order.updateOne({ id }, { status });

        if (matchedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(200).send({ status: 'success', message: 'Order successfully edited' });
};
