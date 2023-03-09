import { BaseController } from '../../../../shared/infra/http/controller/BaseController';
import { LoginUseCase } from './LoginUseCase';
import { LoginDTO } from './LoginDTO';
import { PasswordDoesntMatchError, UserNameDoesntExistError } from './LoginErrors';

export class LoginController extends BaseController {
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const loginDTO: LoginDTO = req.body;
    try {
      const loginResult = await this.useCase.execute(loginDTO);
      return this.ok(res, loginResult);
    } catch (err) {
      if (err instanceof UserNameDoesntExistError) {
        return this.notFound(res, err.message);
      }
      if (err instanceof PasswordDoesntMatchError) {
        return this.clientError(res, err.message);
      }
      return this.fail(res, err as string);
    }
  }
}