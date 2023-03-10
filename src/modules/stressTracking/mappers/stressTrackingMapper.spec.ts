import { StressTracking } from '../domain/StressTracking';
import { StressTrackingMapper } from './stressTrackingMapper';

describe('StressTrackingMapper', () => {
  describe('toDTO', () => {
    it('should map a StressTracking object to a StressTrackingDTO object', () => {
      // Arrange
      const stressTracking = StressTracking.create({
        userId: 'user123',
        imageUrl: 'https://example.com/image.jpg',
        isAnonymous: false,
        stressLevel: 7,
        createdAt: new Date()
      }, '1');

      // Act
      const stressTrackingDTO = StressTrackingMapper.toDTO(stressTracking);

      // Assert
      expect(stressTrackingDTO.id).toEqual('1');
      expect(stressTrackingDTO.userId).toEqual('user123');
      expect(stressTrackingDTO.imageUrl).toEqual('https://example.com/image.jpg');
      expect(stressTrackingDTO.isAnonymous).toEqual(false);
      expect(stressTrackingDTO.stressLevel).toEqual(7);
      expect(stressTrackingDTO.createdAt).toEqual(stressTracking.createdAt);
    });
  });

  describe('toDomain', () => {
    it('should map a raw object to a StressTracking domain object', () => {
      // Arrange
      const raw = {
        _id: '1',
        userId: 'user123',
        isAnonymous: false,
        createdAt: new Date(),
        imageUrl: 'https://example.com/image.jpg',
        stressLevel: 7,
      };

      // Act
      const stressTracking = StressTrackingMapper.toDomain(raw);

      // Assert
      expect(stressTracking.stressTrackingId).toEqual('1');
      expect(stressTracking.userId).toEqual('user123');
      expect(stressTracking.isAnonymous).toEqual(false);
      expect(stressTracking.createdAt).toEqual(raw.createdAt);
      expect(stressTracking.imageUrl).toEqual('https://example.com/image.jpg');
      expect(stressTracking.stressLevel).toEqual(7);
    });
  });

  describe('toPersistence', () => {
    it('should map a StressTracking domain object to a persistence object', () => {
      // Arrange
      const stressTracking = StressTracking.create({
        userId: 'user123',
        imageUrl: 'https://example.com/image.jpg',
        isAnonymous: false,
        stressLevel: 7,
        createdAt: new Date()
      }, '1');

      // Act
      const persistenceObject = StressTrackingMapper.toPersistence(stressTracking);

      // Assert
      expect(persistenceObject._id).toEqual('1');
      expect(persistenceObject.userId).toEqual('user123');
      expect(persistenceObject.imageUrl).toEqual('https://example.com/image.jpg');
      expect(persistenceObject.isAnonymous).toEqual(false);
      expect(persistenceObject.stressLevel).toEqual(7);
    });
  });
});
