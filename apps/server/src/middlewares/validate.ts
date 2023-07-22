import { RequestHandler } from 'express';
import * as z from 'zod';

export const validate = (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) => {
    return <RequestHandler>(async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);

            next();
        } catch (error) {
            return res.status(429).send({ status: 'error', message: 'Invalid data format.' });
        }
    });
};
