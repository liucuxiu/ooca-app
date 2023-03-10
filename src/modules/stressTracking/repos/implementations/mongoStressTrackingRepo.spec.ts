import { MongoStressTrackingRepo } from './mongoStressTrackingRepo';
import { StressTrackingModel } from '../../../../shared/infra/database/mongo/models/StressTracking';
import { StressTracking } from '../../domain/StressTracking';
import { StressTrackingMapper } from '../../mappers/stressTrackingMapper';

jest.mock('../../../../shared/infra/database/mongo/models/StressTracking');

describe('MongoStressTrackingRepo', () => {
  let repo: MongoStressTrackingRepo;

  beforeEach(() => {
    jest.resetAllMocks();
    repo = new MongoStressTrackingRepo();
  });

  describe('findAll', () => {
    it('should return an array of StressTracking instances', async () => {
      const userId = 'user1';
      const stressTrackingDoc1 = {
        _id: '1',
        userId: 'user1',
        level: 3,
        note: 'test1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const stressTrackingDoc2 = {
        _id: '2',
        userId: 'user1',
        level: 4,
        note: 'test2',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const expectedStressTracking1 = StressTrackingMapper.toDomain(stressTrackingDoc1);
      const expectedStressTracking2 = StressTrackingMapper.toDomain(stressTrackingDoc2);
      StressTrackingModel.find = jest.fn().mockImplementationOnce(() => ({
        sort: jest.fn().mockResolvedValueOnce([stressTrackingDoc1, stressTrackingDoc2])
      }));

      const result = await repo.findAll(userId);

      expect(StressTrackingModel.find).toHaveBeenCalledWith({ userId });
      expect(result).toEqual([expectedStressTracking1, expectedStressTracking2]);
    });
  });

  describe('save', () => {
    it('should return a StressTracking instance', async () => {
      const stressTracking = StressTracking.create({
        isAnonymous: false,
        stressLevel: 0,
        userId: 'user1'
      });
      const expectedPersistenceData = StressTrackingMapper.toPersistence(stressTracking);
      const savedDoc = {
        _id: '1',
        level: 5,
        note: 'test',
        userId: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const expectedSavedResult = StressTrackingMapper.toDomain(savedDoc);
      StressTrackingModel.create = jest.fn().mockResolvedValue(savedDoc);

      const result = await repo.save(stressTracking);

      expect(StressTrackingModel.create).toHaveBeenCalledWith(expectedPersistenceData);
      expect(result).toEqual(expectedSavedResult);
    });
  });
});
