import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { CreateStressTrackingDTO } from './CreateStressTrackingDTO';
import { stressTrackingRepo } from '../../repos';
import { StressTracking } from '../../domain/StressTracking';


jest.mock('../../repos/implementations/mongoStressTrackingRepo', () => {
  const repo = {
    save: jest.fn(),
    findALl: jest.fn()
  };
  return { MongoStressTrackingRepo: jest.fn(() => repo) };
});
const saveMock = stressTrackingRepo.save as jest.Mock;
const useCase = new CreateStressTrackingUseCase(stressTrackingRepo);

describe('CreateStressTrackingUseCase', () => {
  it('should call the createStressTracking function of the stressTrackingRepo', async () => {
    const request: CreateStressTrackingDTO = {
      imageUrl: 'abc.png',
      isAnonymous: false,
      stressLevel: 0,
      userId: '123',
    };
    const idMock = '1b7d2fe6-111b-4d59-a2e6-b8847f7a7b79';
    const resultMock = StressTracking.create({
      userId: request.isAnonymous ? 'anonymous' : request.userId,
      imageUrl: request.imageUrl,
      isAnonymous: request.isAnonymous,
      stressLevel: request.stressLevel,
      createdAt: new Date('2023-03-10T13:45:49.274Z')
    }, idMock);
    saveMock.mockResolvedValue(resultMock);

    const result = await useCase.execute(request);

    expect(stressTrackingRepo.save).toHaveBeenCalled();
    expect(result).toEqual({
      id: idMock,
      userId: resultMock.isAnonymous ? 'anonymous' : request.userId,
      imageUrl: resultMock.imageUrl,
      isAnonymous: resultMock.isAnonymous,
      stressLevel: resultMock.stressLevel,
      createdAt: resultMock.createdAt,
    });
  });
});
