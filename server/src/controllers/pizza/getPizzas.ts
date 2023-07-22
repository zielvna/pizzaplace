import { RequestHandler } from 'express';
import { Pizza } from '../../models/Pizza';

export const getPizzas: RequestHandler = async (req, res) => {
    const pizzas = await Pizza.find();

    res.status(200).send({
        status: 'success',
        data: { pizzas },
    });
};
