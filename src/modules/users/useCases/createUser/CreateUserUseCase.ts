import { UseCase } from '../../../../shared/core/UseCase';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { EmailAlreadyExistsError, UsernameTakenError } from './CreateUserErrors';
import bcrypt from 'bcrypt';
import { User } from '../../domain/User';

export class CreateUserUseCase implements UseCase<any, any> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(userDTO: CreateUserDTO): Promise<any> {
    const { username, email, password } = userDTO;

    try {
      const usernameExisted = await this.userRepo.findUserByUsername(username);
      if (usernameExisted) {
        throw new UsernameTakenError(username);
      }
    }
    catch (err) {
      if (err instanceof UsernameTakenError) throw err;
    }

    try {
      const emailExisted = await this.userRepo.findUserByEmail(email);
      if (emailExisted) {
        throw new EmailAlreadyExistsError(email);
      }
    }
    catch (err) {
      if (err instanceof EmailAlreadyExistsError) throw err;
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const user: User = User.create({ username, email, password: hashPassword });

    const newUser = await this.userRepo.save(user);
    return newUser.serialize();
  }

}