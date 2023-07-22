import { RequestHandler } from 'express';
import { Pizza } from '../../models/Pizza';
import { EditPizzaRequestBody } from '../../schemas/pizza';

export const editPizza: RequestHandler = async (req, res) => {
    const values: EditPizzaRequestBody = req.body;

    try {
        const { matchedCount } = await Pizza.updateOne({ id: values.id }, values);

        if (matchedCount !== 1) {
            return res.status(404).send({ status: 'error', message: 'Pizza not found' });
        }
    } catch (error) {
        return res.status(500).send({ status: 'error', message: 'Database error' });
    }

    res.status(200).send({ status: 'success', message: 'Pizza successfully edited' });
};
