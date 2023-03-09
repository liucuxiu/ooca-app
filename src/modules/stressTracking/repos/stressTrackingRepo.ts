import { StressTracking } from '../domain/StressTracking';

export interface IStressTrackingRepo {
  save(stressTracking: any): Promise<StressTracking>;

  findAll(userId: string): Promise<StressTracking[]>;
}