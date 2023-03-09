import { v4 as v4uuid } from 'uuid';

interface IStressTrackingProperties {
  id?: string;
  userId: string;
  isAnonymous: boolean;
  stressLevel: number;
  imageUrl?: string;
  createdAt: Date;
}

interface IStressTrackingSerialize {
  id: string;
  userId: string;
  isAnonymous: boolean;
  stressLevel: number;
  imageUrl?: string;
  createdAt: Date;
}

export class StressTracking {
  props: IStressTrackingProperties;
  protected id: string;

  private constructor(props: IStressTrackingProperties) {
    this.props = props;
    this.id = props.id ? props.id : v4uuid();
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  public static create(props: IStressTrackingProperties): StressTracking {
    return new StressTracking(props);
  }
}