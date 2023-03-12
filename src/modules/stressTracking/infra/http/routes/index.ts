import express from 'express';
import { createStressTrackingController } from '../../../useCases/createStressTracking';
import { isAuthenticated } from '../../../../../shared/infra/http/middlewares/authenticate.middleware';
import {
  validateSchema
} from '../../../../../shared/infra/http/middlewares/validateRequestBody.middleware';
import { createStressTrackingSchema } from '../schemas/createStressTracking.joi';
import { getStressTrackingController } from '../../../useCases/getStressTracking';
import multer from 'multer';
import { v4 as v4uuid } from 'uuid';

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = v4uuid();
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

export const stressTrackingRouter = express.Router();

stressTrackingRouter.post('/',
  isAuthenticated(),
  upload.single('image'),
  validateSchema(createStressTrackingSchema),
  (req: any, res: any) => createStressTrackingController.execute(req, res));


stressTrackingRouter.get('/',
  isAuthenticated(),
  (req: any, res: any) => getStressTrackingController.execute(req, res));