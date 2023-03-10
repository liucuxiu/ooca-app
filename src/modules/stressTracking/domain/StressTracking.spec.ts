import { StressTracking } from './StressTracking';

describe('StressTracking', () => {
  describe('constructor', () => {
    it('should create an instance of StressTracking with an id if one is not provided', () => {
      const props = {
        userId: '123',
        isAnonymous: false,
        stressLevel: 5,
        createdAt: new Date(),
      };

      const stressTracking = StressTracking.create(props);

      expect(stressTracking.stressTrackingId).toBeDefined();
    });

    it('should create an instance of StressTracking with the provided id', () => {
      const props = {
        userId: '123',
        isAnonymous: false,
        stressLevel: 5,
        createdAt: new Date(),
      };
      const id = '123abc'
      const stressTracking = StressTracking.create(props, id);

      expect(stressTracking.stressTrackingId).toBe('123abc');
    });
  });

  describe('getters', () => {
    it('should return the correct values', () => {
      const props = {
        id: 'abc',
        userId: '123',
        isAnonymous: false,
        stressLevel: 5,
        imageUrl: 'https://example.com/image.jpg',
        createdAt: new Date(),
      };

      const stressTracking = StressTracking.create(props);

      expect(stressTracking.userId).toBe('123');
      expect(stressTracking.isAnonymous).toBe(false);
      expect(stressTracking.stressLevel).toBe(5);
      expect(stressTracking.imageUrl).toBe('https://example.com/image.jpg');
      expect(stressTracking.createdAt).toEqual(props.createdAt);
    });
  });
});
