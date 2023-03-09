import { CreateStressTrackingController } from "./CreateStressTrackingController";
import { CreateStressTrackingUseCase } from "./CreateStressTrackingUseCase";

describe("CreateStressTrackingController", () => {
  it("should execute use case and return 200 status", async () => {
    const mockRequest: any = {};
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const stressTrackingRepo = {
      save: jest.fn(),
      findAll: jest.fn()
    };
    const mockUseCase = new CreateStressTrackingUseCase(stressTrackingRepo);
    const controller = new CreateStressTrackingController(mockUseCase);

    await controller.execute(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
