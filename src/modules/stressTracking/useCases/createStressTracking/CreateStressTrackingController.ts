import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { CreateStressTrackingUseCase } from './CreateStressTrackingUseCase';
import { StressTrackingDTO } from '../../dtos/StressTrackingDTO';
import sharp from 'sharp';

export class CreateStressTrackingController extends BaseController {
  private useCase: CreateStressTrackingUseCase;

  constructor(useCase: CreateStressTrackingUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: any): Promise<any> {
    if (req.file) {
      const resizedImage = await sharp(req.file.path).resize(500, 500).toBuffer();
      const resizedImagePath = 'uploads/' + req.file.filename;
      await sharp(resizedImage).toFile(resizedImagePath);
    }

    const stressTrackingDTO: StressTrackingDTO = {
      ...req.body,
      imageUrl: req.file ? req.file.path : undefined,
      userId: req.decoded.userId
    };

    try {
      const createStressTrackingResult = await this.useCase.execute(stressTrackingDTO);
      return this.ok(res, createStressTrackingResult);
    }
    catch (err) {
      return this.fail(res, err as string);
    }
  }
}