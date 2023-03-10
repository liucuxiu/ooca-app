import express from 'express';
import { createStressTrackingController } from '../../../useCases/createStressTracking';
import { isAuthenticated } from '../../../../../shared/infra/http/middlewares/authenticate.middleware';
import { validateSchema } from '../../../../../shared/infra/http/middlewares/validateRequestBody.middleware';
import { createStressTrackingSchema } from '../schemas/createStressTracking.joi';
import { getStressTrackingController } from '../../../useCases/getStressTracking';

export const stressTrackingRouter = express.Router();

stressTrackingRouter.post('/',
  isAuthenticated(),
  validateSchema(createStressTrackingSchema),
  (req: any, res: any) => createStressTrackingController.execute(req, res));


stressTrackingRouter.get('/',
  isAuthenticated(),
  (req: any, res: any) => getStressTrackingController.execute(req, res));