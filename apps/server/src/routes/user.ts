import { Router } from 'express';
import { changePassword, getUser, login, logout, register } from '../controllers/user';
import { getSetup } from '../controllers/user/getSetup';
import { checkSetup } from '../middlewares/checkSetup';
import { checkUser } from '../middlewares/checkUser';
import { validate } from '../middlewares/validate';
import { changePasswordSchema, loginSchema, registerSchema } from '../schemas/user';

export const userRouter = Router();

userRouter.post('/change-password', checkSetup, checkUser, validate(changePasswordSchema), changePassword);
userRouter.get('/user', checkSetup, checkUser, getUser);
userRouter.post('/login', checkSetup, validate(loginSchema), login);
userRouter.get('/logout', checkSetup, checkUser, logout);
userRouter.post('/register', validate(registerSchema), register);
userRouter.get('/setup', getSetup);
