import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { GetStressTrackingUseCase } from './GetStressTrackingUseCase';

export class GetStressTrackingController extends BaseController {
  private useCase: GetStressTrackingUseCase;

  constructor(useCase: GetStressTrackingUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const { userId } = req.decoded;

    try {
      const listStressTracking = await this.useCase.execute(userId);
      return this.ok(res, listStressTracking);
    }
    catch (err) {
      return this.fail(res, err as string);
    }
  }
}