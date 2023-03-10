export interface CreateStressTrackingDTO {
  id?: string;
  userId: string;
  isAnonymous: boolean;
  stressLevel: number;
  imageUrl?: string;
}