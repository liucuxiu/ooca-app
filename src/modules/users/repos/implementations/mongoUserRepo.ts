import { IUserRepo } from '../userRepo';
import { UserModel } from '../../../../shared/infra/database/mongo/models/User';
import { User } from '../../domain/User';
import { UserMap } from '../../mappers/userMapper';

export class MongoUserRepository implements IUserRepo {

  async save(user: User): Promise<User> {
    const persistenceUser = UserMap.toPersistence(user);
    const saveResult = await UserModel.create(persistenceUser);
    return UserMap.toDomain(saveResult);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user: any = await UserModel.findOne({ email }).exec();
    return UserMap.toDomain(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    const user: any = await UserModel.findOne({ username }).exec();
    if (!user) throw new Error('User not found.');

    return UserMap.toDomain(user);
  }
}