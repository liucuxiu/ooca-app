import { StressTracking } from '../domain/StressTracking';
import { StressTrackingDTO } from '../dtos/StressTrackingDTO';

export class StressTrackingMapper {
  public static toDTO(stressTracking: StressTracking): StressTrackingDTO {
    return {
      id: stressTracking.stressTrackingId,
      userId: stressTracking.isAnonymous ? 'anonymous' : stressTracking.userId,
      imageUrl: stressTracking.imageUrl,
      isAnonymous: stressTracking.isAnonymous,
      stressLevel: stressTracking.stressLevel,
      createdAt: stressTracking.createdAt,
    };
  }

  public static toDomain(raw: any) {
    return StressTracking.create({
      userId: raw.userId,
      isAnonymous: raw.isAnonymous,
      createdAt: raw.createdAt,
      imageUrl: raw.imageUrl,
      stressLevel: raw.stressLevel
    }, raw._id);
  }

  public static toPersistence(stressTracking: StressTracking) {
    return {
      _id: stressTracking.stressTrackingId,
      userId: stressTracking.userId,
      stressLevel: stressTracking.stressLevel,
      imageUrl: stressTracking.imageUrl,
      isAnonymous: stressTracking.isAnonymous
    };
  }
}