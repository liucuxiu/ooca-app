export interface StressTrackingDTO {
  id: string
  userId: string
  stressLevel: number
  imageUrl?: string
  isAnonymous: boolean
  createdAt?: Date
}