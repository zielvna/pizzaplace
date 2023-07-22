import { Router } from 'express';
import { createOrder, deleteOrder, editOrder, getOrders } from '../controllers/order';
import { checkAdmin } from '../middlewares/checkAdmin';
import { checkSetup } from '../middlewares/checkSetup';
import { checkUser } from '../middlewares/checkUser';
import { validate } from '../middlewares/validate';
import { createOrderSchema, deleteOrderSchema, editOrderSchema } from '../schemas/order';

export const orderRouter = Router();

orderRouter.post('/order', checkSetup, checkUser, validate(createOrderSchema), createOrder);
orderRouter.delete('/order', checkSetup, checkAdmin, validate(deleteOrderSchema), deleteOrder);
orderRouter.patch('/order', checkSetup, checkAdmin, validate(editOrderSchema), editOrder);
orderRouter.get('/orders', checkSetup, checkUser, getOrders);
