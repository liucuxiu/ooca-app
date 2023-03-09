import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';

export class CreateStressTrackingController extends BaseController {
  private useCase: CreateStressTrackingUseCase;

  constructor(useCase: CreateStressTrackingUseCase) {
    super();
    this.useCase = useCase;
  }

  executeImpl(req: any, res: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}