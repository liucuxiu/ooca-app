import { GetStressTrackingController } from './GetStressTrackingController';
import { GetStressTrackingUseCase } from './GetStressTrackingUseCase';
import { stressTrackingRepo } from '../../repos';
import httpMocks from 'node-mocks-http';

jest.mock('./GetStressTrackingUseCase', () => {
  const useCase = {
    execute: jest.fn()
  };
  return { GetStressTrackingUseCase: jest.fn(() => useCase) };
});
const useCaseMock = new GetStressTrackingUseCase(stressTrackingRepo);
const executeMock = useCaseMock.execute as jest.Mock;

const controller = new GetStressTrackingController(useCaseMock);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('GetStressTrackingController', () => {
  it('should call use case with correct arguments and return 200 status code on success', async () => {
    // Arrange
    const mockUserId = '123';
    const mockGetStressTrackingResult = [
      {
        'id': 'cbbf5a01-2c0b-4954-ab31-17361b9766f5',
        'userId': 'anonymous',
        'isAnonymous': true,
        'stressLevel': 1,
        'createdAt': '2023-03-10T14:07:57.084Z'
      },
      {
        'id': '5006fb7c-77a2-460d-8d54-26877079ce8d',
        'userId': 'anonymous',
        'isAnonymous': true,
        'stressLevel': 1,
        'createdAt': '2023-03-10T14:07:55.541Z'
      }
    ];

    executeMock.mockResolvedValue(mockGetStressTrackingResult);
    const mockReq = httpMocks.createRequest({
      decoded: { userId: mockUserId },
    });
    const mockRes = httpMocks.createResponse();

    // Act
    await controller.executeImpl(mockReq, mockRes);
    let data = mockRes._getJSONData();

    // Assert
    expect(useCaseMock.execute).toHaveBeenCalledWith(mockUserId,);
    expect(mockRes.statusCode).toBe(200);
    expect(data).toEqual(mockGetStressTrackingResult);
  });

  it('should return 500 status code and error message on use case failure', async () => {
    // Arrange
    const mockUserId = '123';
    const mockError = 'Error message';

    executeMock.mockRejectedValue(mockError);
    const mockReq = httpMocks.createRequest({
      decoded: { userId: mockUserId },
    });
    const mockRes = httpMocks.createResponse();

    // Act
    await controller.executeImpl(mockReq, mockRes);
    let data = mockRes._getJSONData();

    // Assert
    expect(useCaseMock.execute).toHaveBeenCalledWith(mockUserId);
    expect(mockRes.statusCode).toEqual(500);
    expect(data).toEqual({
      message: mockError
    });
  });
});
