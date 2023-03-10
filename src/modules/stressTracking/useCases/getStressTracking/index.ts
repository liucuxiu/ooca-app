import { GetStressTrackingUseCase } from './GetStressTrackingUseCase';
import { stressTrackingRepo } from '../../repos';
import { GetStressTrackingController } from './GetStressTrackingController';

const getStressTrackingUseCase = new GetStressTrackingUseCase(stressTrackingRepo);
const getStressTrackingController = new GetStressTrackingController(getStressTrackingUseCase);

export { getStressTrackingUseCase, getStressTrackingController };