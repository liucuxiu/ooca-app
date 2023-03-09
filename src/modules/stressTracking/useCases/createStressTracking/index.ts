import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { stressTrackingRepo } from '../../repos';
import { CreateStressTrackingController } from './CreateStressTrackingController';

const createStressTrackingUseCase = new CreateStressTrackingUseCase(stressTrackingRepo);
const createStressTrackingController = new CreateStressTrackingController(createStressTrackingUseCase);

export { createStressTrackingUseCase, createStressTrackingController };