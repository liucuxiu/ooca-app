import { StressTracking } from '../domain/StressTracking';

export class StressTrackingMapper {
  public static toDTO(stressTracking: StressTracking) {

  }

  public static toDomain(raw: any) {
    return StressTracking.create({
      id: raw._id,
      userId: raw.userId,
      isAnonymous: raw.isAnonymous,
      createdAt: raw.createdAt,
      imageUrl: raw.imageUrl,
      stressLevel: raw.stressLevel
    });
  }

  public static toPersistence() {

  }
}