import Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});
