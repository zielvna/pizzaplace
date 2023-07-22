import { RequestHandler } from 'express';
import { Pizza } from '../../models/Pizza';
import { DeletePizzaRequestBody } from '../../schemas/pizza';

export const deletePizza: RequestHandler = async (req, res) => {
    const { id }: DeletePizzaRequestBody = req.body;

    try {
        const { deletedCount } = await Pizza.deleteOne({ id });

        if (deletedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'Pizza not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(200).send({ status: 'success', message: 'Pizza successfully deleted' });
};
