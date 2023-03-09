import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { IStressTrackingRepo } from '../../repos/stressTrackingRepo';

describe('CreateStressTrackingUseCase', () => {
  let stressTrackingRepo: IStressTrackingRepo;
  let createStressTrackingUseCase: CreateStressTrackingUseCase;

  beforeEach(() => {
    stressTrackingRepo = {
      save: jest.fn(),
      findAll: jest.fn()
    };
    createStressTrackingUseCase = new CreateStressTrackingUseCase(stressTrackingRepo);
  });

  it('should call the createStressTracking function of the stressTrackingRepo', async () => {
    const request = {
      // Set request data here
    };

    await createStressTrackingUseCase.execute(request);

    expect(stressTrackingRepo.save).toHaveBeenCalled();
  });
});
