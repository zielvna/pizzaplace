import { RequestHandler } from 'express';
import { Order } from '../../models/Order';
import { DeleteOrderRequestBody } from '../../schemas/order';

export const deleteOrder: RequestHandler = async (req, res) => {
    const { id }: DeleteOrderRequestBody = req.body;

    try {
        const { deletedCount } = await Order.deleteOne({ id });

        if (deletedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'Order not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(200).send({ status: 'success', message: 'Order successfully deleted' });
};
