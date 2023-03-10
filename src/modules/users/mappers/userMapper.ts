import { User } from '../domain/User';
import { UserDTO } from '../dtos/userDTO';

export class UserMap {
  public static toDTO(user: User): UserDTO {
    return {
      username: user.username,
      isEmailVerified: user.isEmailVerified,
      isDeleted: user.isDeleted
    };
  }

  public static toDomain(raw: any): User {
    return User.create({
      username: raw.username,
      isDeleted: raw.is_deleted,
      email: raw.email,
      password: raw.password
    }, raw._id);
  }

  public static toPersistence(user: User) {
    return {
      _id: user.userId,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      username: user.username,
      password: user.password,
      isDeleted: user.isDeleted
    };
  }
}
