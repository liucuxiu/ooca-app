import { IStressTrackingRepo } from '../stressTrackingRepo';
import { StressTracking } from '../../domain/StressTracking';
import { StressTrackingMapper } from '../../mappers/stressTrackingMapper';
import { StressTrackingModel } from '../../../../shared/infra/database/mongo/models/StressTracking';

export class MongoStressTrackingRepo implements IStressTrackingRepo {
  async findAll(userId: string): Promise<StressTracking[]> {
    const listStressTracking = await StressTrackingModel.find({
      userId
    }).sort([['createdAt', -1]]);
    return listStressTracking.map(stressTracking => StressTrackingMapper.toDomain(stressTracking));
  }

  async save(stressTracking: any): Promise<StressTracking> {
    const persistenceStressTracking = StressTrackingMapper.toPersistence(stressTracking);
    const saveResult = await StressTrackingModel.create(persistenceStressTracking);
    return StressTrackingMapper.toDomain(saveResult);
  }
}