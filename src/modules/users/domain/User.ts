import { JWTToken, RefreshToken } from './jwt';
import { v4 as v4uuid } from 'uuid';
import { BaseError } from '../../../shared/core/BaseError';
import bcrypt from 'bcrypt';

interface IUserProperties {
  email: string;
  username: string;
  password?: string;
  isEmailVerified?: boolean;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
  lastLogin?: Date;
}

interface IUserSerialize {
  id: string;
  email: string;
  username: string;
}

export class User {
  props: IUserProperties;
  protected id: string;

  private constructor(props: IUserProperties, id?: string) {
    this.props = props;
    this.id = id ? id : v4uuid();
  }

  get userId() {
    return this.id;
  }

  get email() {
    return this.props.email;
  }

  get username() {
    return this.props.username;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  get accessToken(): string | undefined {
    return this.props.accessToken;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }

  get isDeleted(): boolean | undefined {
    return this.props.isDeleted;
  }

  get isEmailVerified(): boolean | undefined {
    return this.props.isEmailVerified;
  }

  public async validatePassword(plainTextPassword: string) {
    return this.bcryptCompare(plainTextPassword, this.password);
  }

  private bcryptCompare(plainText: string, hashed: string | undefined): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (hashed != null) {
        bcrypt.compare(plainText, hashed, (err, compareResult) => {
          if (err) return resolve(false);
          return resolve(compareResult);
        });
      }
    });
  }

  public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
    this.props.accessToken = token;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }


  public isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  public serialize(): IUserSerialize {
    return {
      id: this.id,
      username: this.props.username,
      email: this.props.email,
    };
  }

  static isValidEmail(email: string | undefined): boolean {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email ? reg.test(email) : false;
  }

  static isValidUserName(username: string | undefined): boolean {
    const reg = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
    return username ? reg.test(username) : false;
  }

  public static create(props: IUserProperties, id?: string): User {
    const { username, email } = props;
    if (!User.isValidUserName(username)) {
      throw BaseError.invalidInput('username');
    }
    if (!User.isValidEmail(email)) {
      throw BaseError.invalidInput('email');
    }
    return new User({
      ...props,
      isDeleted: props.isDeleted ? props.isDeleted : false,
      isEmailVerified: props.isEmailVerified ? props.isEmailVerified : false,
    }, id);
  }
}