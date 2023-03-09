import express from 'express';
import { createUserController } from '../../../useCases/createUser';
import { validateSchema } from '../../../../../shared/infra/http/middlewares/validateRequestBody.middleware';
import { createUserSchema } from '../schemas/createUser.joi';
import { loginUserSchema } from '../schemas/loginUserSchema';
import { loginController } from '../../../useCases/login';

export const userRouter = express.Router();

userRouter.post('/signup',
  validateSchema(createUserSchema),
  (req: any, res: any) => createUserController.execute(req, res));

userRouter.post('/login',
  validateSchema(loginUserSchema),
  (req: any, res: any) => loginController.execute(req, res));
