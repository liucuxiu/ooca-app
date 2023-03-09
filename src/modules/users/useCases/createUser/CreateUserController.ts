import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from './CreateUserDTO';
import { EmailAlreadyExistsError, UsernameTakenError } from './CreateUserErrors';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const userDto: CreateUserDTO = req.body;

    try {
      const createUserResult = await this.useCase.execute(userDto);
      return this.ok(res, createUserResult);
    } catch (err) {
      if (err instanceof EmailAlreadyExistsError || err instanceof UsernameTakenError) {
        return this.conflict(res, err.message);
      }
      return this.fail(res, err as string);
    }
  }
}