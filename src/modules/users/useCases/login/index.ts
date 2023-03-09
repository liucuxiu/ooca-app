import { LoginController } from './LoginController';
import { LoginUseCase } from './LoginUseCase';
import { userRepo } from '../../repos';
import { authService } from '../../services';

const loginUseCase = new LoginUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase };