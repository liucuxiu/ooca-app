import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { StressTrackingDTO } from '../../dtos/StressTrackingDTO';

export class CreateStressTrackingController extends BaseController {
  private useCase: CreateStressTrackingUseCase;

  constructor(useCase: CreateStressTrackingUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const stressTrackingDTO: StressTrackingDTO = req.body;
    const { userId } = req.decoded;

    try {
      const createStressTrackingResult = await this.useCase.execute({
        ...stressTrackingDTO,
        userId
      });
      return this.ok(res, createStressTrackingResult);
    }
    catch (err) {
      return this.fail(res, err as string);
    }
  }
}