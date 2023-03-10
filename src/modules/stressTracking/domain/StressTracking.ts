import { v4 as v4uuid } from 'uuid';

interface IStressTrackingProperties {
  userId: string;
  isAnonymous: boolean;
  stressLevel: number;
  imageUrl?: string;
  createdAt?: Date;
}

interface IStressTrackingSerialize {
  id: string;
  userId: string;
  isAnonymous: boolean;
  stressLevel: number;
  imageUrl?: string;
  createdAt?: Date;
}

export class StressTracking {
  props: IStressTrackingProperties;
  protected id: string;

  private constructor(props: IStressTrackingProperties, id?: string) {
    this.props = props;
    this.id = id ? id: v4uuid();
  }

  get stressTrackingId(): string {
    return this.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get isAnonymous(): boolean {
    return this.props.isAnonymous;
  }

  get stressLevel(): number {
    return this.props.stressLevel;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public serialize(): IStressTrackingSerialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      imageUrl: this.imageUrl,
      isAnonymous: this.isAnonymous,
      stressLevel: this.stressLevel,
      userId: this.userId
    };
  }

  public static create(props: IStressTrackingProperties, id?: string): StressTracking {
    return new StressTracking(props, id);
  }
}