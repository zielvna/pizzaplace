import * as z from 'zod';

export const changePasswordSchema = z.object({
    password: z.string(),
    newPassword: z.string(),
});

export type ChangePasswordRequestBody = z.infer<typeof changePasswordSchema>;

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    role: z.enum(['user', 'admin']),
});

export type LoginRequestBody = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    role: z.enum(['user', 'admin']),
});

export type RegisterRequestBody = z.infer<typeof registerSchema>;
