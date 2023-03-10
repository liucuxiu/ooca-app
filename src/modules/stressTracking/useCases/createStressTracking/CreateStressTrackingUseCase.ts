import { UseCase } from '../../../../shared/core/UseCase';
import { IStressTrackingRepo } from '../../repos/stressTrackingRepo';
import { CreateStressTrackingDTO } from './CreateStressTrackingDTO';
import { StressTracking } from '../../domain/StressTracking';
import { StressTrackingMapper } from '../../mappers/stressTrackingMapper';

export class CreateStressTrackingUseCase implements UseCase<any, any> {
  private stressTrackingRepo: IStressTrackingRepo;

  constructor(stressTrackingRepo: IStressTrackingRepo) {
    this.stressTrackingRepo = stressTrackingRepo;
  }

  async execute(stressTrackingDTO: CreateStressTrackingDTO): Promise<any> {
    const stressTracking = StressTracking.create(stressTrackingDTO);
    const newStressTracking = await this.stressTrackingRepo.save(stressTracking);

    return StressTrackingMapper.toDTO(newStressTracking);
  }
}