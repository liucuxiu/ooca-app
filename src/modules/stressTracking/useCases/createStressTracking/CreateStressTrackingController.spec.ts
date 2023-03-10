import { CreateStressTrackingController } from './CreateStressTrackingController';
import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { stressTrackingRepo } from '../../repos';
import httpMocks from 'node-mocks-http';

jest.mock('./CreateStressTrackingUseCase', () => {
  const useCase = {
    execute: jest.fn()
  };
  return { CreateStressTrackingUseCase: jest.fn(() => useCase) };
});
const useCaseMock = new CreateStressTrackingUseCase(stressTrackingRepo);
const executeMock = useCaseMock.execute as jest.Mock;

const controller = new CreateStressTrackingController(useCaseMock);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('CreateStressTrackingController', () => {
  it('should call use case with correct arguments and return 200 status code on success', async () => {
    // Arrange
    const mockStressTrackingDTO = {
      stressLevel: 5,
      isAnonymous: false
    };
    const mockUserId = '123';
    const mockCreateStressTrackingResult = {
      stressLevel: 5,
      isAnonymous: false
    };

    executeMock.mockResolvedValue(mockCreateStressTrackingResult);
    const mockReq = httpMocks.createRequest({
      body: mockStressTrackingDTO,
      decoded: { userId: mockUserId },
    });
    const mockRes = httpMocks.createResponse();

    // Act
    await controller.executeImpl(mockReq, mockRes);
    let data = mockRes._getJSONData();

    // Assert
    expect(useCaseMock.execute).toHaveBeenCalledWith({
      ...mockStressTrackingDTO,
      userId: mockUserId,
    });
    expect(mockRes.statusCode).toBe(200);
    expect(data).toEqual(mockCreateStressTrackingResult);
  });

  it('should return 500 status code and error message on use case failure', async () => {
    // Arrange
    const mockStressTrackingDTO = { stressLevel: 5, isAnonymous: false };
    const mockUserId = '123';
    const mockError = 'Error message';

    executeMock.mockRejectedValue(mockError);
    const mockReq = httpMocks.createRequest({
      body: mockStressTrackingDTO,
      decoded: { userId: mockUserId },
    });
    const mockRes = httpMocks.createResponse();

    // Act
    await controller.executeImpl(mockReq, mockRes);
    let data = mockRes._getJSONData();

    // Assert
    expect(useCaseMock.execute).toHaveBeenCalledWith({
      ...mockStressTrackingDTO,
      userId: mockUserId,
    });
    expect(mockRes.statusCode).toEqual(500);
    expect(data).toEqual({
      message: mockError
    });
  });
});
