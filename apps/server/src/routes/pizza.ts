import { Router } from 'express';
import { createPizza, deletePizza, editPizza, getPizzas } from '../controllers/pizza';
import { checkAdmin } from '../middlewares/checkAdmin';
import { checkSetup } from '../middlewares/checkSetup';
import { validate } from '../middlewares/validate';
import { createPizzaSchema, deletePizzaSchema, editPizzaSchema } from '../schemas/pizza';

export const pizzaRouter = Router();

pizzaRouter.post('/pizza', checkSetup, checkAdmin, validate(createPizzaSchema), createPizza);
pizzaRouter.delete('/pizza', checkSetup, checkAdmin, validate(deletePizzaSchema), deletePizza);
pizzaRouter.patch('/pizza', checkSetup, checkAdmin, validate(editPizzaSchema), editPizza);
pizzaRouter.get('/pizzas', checkSetup, getPizzas);
