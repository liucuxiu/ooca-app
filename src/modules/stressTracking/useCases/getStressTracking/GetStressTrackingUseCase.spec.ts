import { GetStressTrackingUseCase } from './GetStressTrackingUseCase';
import { stressTrackingRepo } from '../../repos';
import { StressTracking } from '../../domain/StressTracking';

jest.mock('../../repos/implementations/mongoStressTrackingRepo', () => {
  const repo = {
    save: jest.fn(),
    findAll: jest.fn()
  };
  return { MongoStressTrackingRepo: jest.fn(() => repo) };
});
const findAll = stressTrackingRepo.findAll as jest.Mock;
const useCase = new GetStressTrackingUseCase(stressTrackingRepo);

describe('GetStressTrackingUseCase', () => {
  it('should call the createStressTracking function of the stressTrackingRepo', async () => {
    const userId = 'userId';
    const resultMock = [
      StressTracking.create({
        userId,
        imageUrl: 'imageUrl',
        isAnonymous: true,
        stressLevel: 0,
        createdAt: new Date('2023-03-10T13:45:49.274Z')
      }, 'idMock1'),
      StressTracking.create({
        userId,
        imageUrl: 'imageUrl',
        isAnonymous: false,
        stressLevel: 0,
        createdAt: new Date('2023-03-10T13:45:49.274Z')
      }, 'idMock2')
    ];
    findAll.mockResolvedValue(resultMock);

    const result = await useCase.execute(userId);

    expect(stressTrackingRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      {
        userId: 'anonymous',
        imageUrl: 'imageUrl',
        isAnonymous: true,
        stressLevel: 0,
        createdAt: new Date('2023-03-10T13:45:49.274Z'),
        id: 'idMock1'
      },
      {
        userId,
        imageUrl: 'imageUrl',
        isAnonymous: false,
        stressLevel: 0,
        createdAt: new Date('2023-03-10T13:45:49.274Z'),
        id: 'idMock2'
      }
    ]);
  });
});
