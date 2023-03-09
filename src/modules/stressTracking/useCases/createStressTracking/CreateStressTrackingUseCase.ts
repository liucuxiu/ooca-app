import { UseCase } from '../../../../shared/core/UseCase';
import { IStressTrackingRepo } from '../../repos/stressTrackingRepo';

export class CreateStressTrackingUseCase implements UseCase<any, any> {
  private stressTrackingRepo: IStressTrackingRepo;

  constructor(stressTrackingRepo: IStressTrackingRepo) {
    this.stressTrackingRepo = stressTrackingRepo;
  }

  async execute(request?: any): Promise<any> {
    return undefined;
  }
}