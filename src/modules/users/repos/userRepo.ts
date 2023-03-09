import { User } from '../domain/User';

export interface IUserRepo {
    findUserByUsername(username: string): Promise<User>;
    findUserByEmail(email: string): Promise<User>;

    save(user: any): Promise<User>;
}