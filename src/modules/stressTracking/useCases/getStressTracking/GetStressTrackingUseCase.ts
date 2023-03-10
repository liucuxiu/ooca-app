import { UseCase } from '../../../../shared/core/UseCase';
import { IStressTrackingRepo } from '../../repos/stressTrackingRepo';
import { StressTracking } from '../../domain/StressTracking';
import { StressTrackingMapper } from '../../mappers/stressTrackingMapper';

export class GetStressTrackingUseCase implements UseCase<any, any> {
  private stressTrackingRepo: IStressTrackingRepo;

  constructor(stressTrackingRepo: IStressTrackingRepo) {
    this.stressTrackingRepo = stressTrackingRepo;
  }

  async execute(userId: string): Promise<any> {
    const listStressTracking: StressTracking[] = await this.stressTrackingRepo.findAll(userId);
    return listStressTracking.map(stressTracking => StressTrackingMapper.toDTO(stressTracking));
  }
}