import Joi from 'joi';

export const createStressTrackingSchema = Joi.object({
  stressLevel: Joi.number().min(0).max(5).integer().required(),
  isAnonymous: Joi.boolean().required()

})