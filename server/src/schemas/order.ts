import * as z from 'zod';

export const createOrderPizzaSchema = z.object({
    id: z.number(),
    size: z.enum(['small', 'medium', 'large']),
    dough: z.enum(['thin', 'thick']),
    amount: z.number(),
});

export type CreateOrderPizzaSchemaRequestBody = z.infer<typeof createOrderPizzaSchema>;

export const createOrderSchema = z.object({
    pizzas: z
        .array(
            z.object({
                id: z.number(),
                size: z.enum(['small', 'medium', 'large']),
                dough: z.enum(['thin', 'thick']),
                amount: z.number(),
            })
        )
        .min(1),
    deliveryDetails: z.object({
        name: z.string(),
        phoneNumber: z.string(),
        street: z.string(),
        houseNumber: z.string(),
        city: z.string(),
    }),
});

export type CreateOrderRequestBody = z.infer<typeof createOrderSchema>;

export const deleteOrderSchema = z.object({
    id: z.number(),
});

export type DeleteOrderRequestBody = z.infer<typeof deleteOrderSchema>;

export const editOrderSchema = z.object({
    id: z.number(),
    status: z.enum(['preparing', 'in delivery', 'delivered']),
});

export type EditOrderRequestBody = z.infer<typeof editOrderSchema>;
