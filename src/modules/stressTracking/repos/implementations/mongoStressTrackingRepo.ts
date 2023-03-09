import { IStressTrackingRepo } from '../stressTrackingRepo';
import { StressTracking } from '../../domain/StressTracking';
import { StressTrackingMapper } from '../../mappers/stressTrackingMapper';

export class MongoStressTrackingRepo implements IStressTrackingRepo {
  async findAll(userId: string): Promise<StressTracking[]> {
    return Promise.resolve([]);
  }

  async save(stressTracking: any): Promise<StressTracking> {
    return StressTrackingMapper.toDomain(stressTracking);
  }

}