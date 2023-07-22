import * as z from 'zod';

export const createPizzaSchema = z.object({
    name: z.string(),
    ingredients: z.string(),
    prices: z.object({
        small: z.number(),
        medium: z.number(),
        large: z.number(),
    }),
});

export type CreatePizzaRequestBody = z.infer<typeof createPizzaSchema>;

export const deletePizzaSchema = z.object({
    id: z.number(),
});

export type DeletePizzaRequestBody = z.infer<typeof deletePizzaSchema>;

export const editPizzaSchema = z.object({
    id: z.number(),
    name: z.string(),
    ingredients: z.string(),
    prices: z.object({
        small: z.number(),
        medium: z.number(),
        large: z.number(),
    }),
});

export type EditPizzaRequestBody = z.infer<typeof editPizzaSchema>;
