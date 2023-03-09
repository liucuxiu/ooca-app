import { UseCase } from '../../../../shared/core/UseCase';
import { IUserRepo } from '../../repos/userRepo';
import { LoginDTO } from './LoginDTO';
import { PasswordDoesntMatchError } from './LoginErrors';
import { JWTToken, RefreshToken } from '../../domain/jwt';
import { IAuthService } from '../../services/authService';

export class LoginUseCase implements UseCase<any, any>{
  private userRepo: IUserRepo;
  private authService;

  constructor (userRepo: IUserRepo, authService: IAuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  async execute(loginDTO: LoginDTO): Promise<any> {
    const { username, password } = loginDTO;

    const user = await this.userRepo.findUserByUsername(username);
    const passwordValid = await user.validatePassword(password);

    if (!passwordValid) {
      throw new PasswordDoesntMatchError();
    }

    // generate token
    const accessToken: JWTToken = this.authService.signJWT({
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      userId: user.userId,
    });

    const refreshToken: RefreshToken = this.authService
      .createRefreshToken();

    user.setAccessToken(accessToken, refreshToken);

    await this.authService.saveAuthenticatedUser(user);
    return {
      accessToken, refreshToken
    };
  }

}