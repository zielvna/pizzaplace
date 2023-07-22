import { RequestHandler } from 'express';
import { Order } from '../../models/Order';

export const getOrders: RequestHandler = async (req, res) => {
    const { type } = req.query;

    let orders;

    if (req.session.user?.role === 'admin' && type === 'all') {
        orders = await Order.find();
    } else {
        orders = await Order.find({ userId: req.session.user?.id });
    }

    res.status(200).send({
        status: 'success',
        data: { orders },
    });
};
