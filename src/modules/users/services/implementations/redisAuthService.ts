import * as jwt from 'jsonwebtoken';
import randtoken from 'rand-token';
import { AbstractRedisClient } from './abstractRedisClient';
import { IAuthService } from '../authService';
import { RefreshToken, JWTToken, JWTClaims } from '../../domain/jwt';
import { User } from '../../domain/User';
import config from 'config';

const tokenExpiryTime: number = config.get('auth.tokenExpiryTime')
const secret: string = config.get('auth.secret')

export class RedisAuthService extends AbstractRedisClient implements IAuthService {
  
  public jwtHashName  = 'activeJwtClients';
  
  constructor (redisClient: any) {
    super(redisClient);
  }

  public async refreshTokenExists (refreshToken: RefreshToken): Promise<boolean> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    return keys.length !== 0;
  }

  public async getUserNameFromRefreshToken (refreshToken: RefreshToken): Promise<string> {
    const keys = await this.getAllKeys(`*${refreshToken}*`);
    const exists = keys.length !== 0;
    
    if (!exists) throw new Error('Username not found for refresh token.');

    const key = keys[0];

    return key.substring(key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1);
  }

  public async saveAuthenticatedUser (user: User): Promise<void> {
    if (user.isLoggedIn()) {
      await this.addToken(user.username, user.refreshToken, user.accessToken);
    }
  }

  public async deAuthenticateUser(username: string): Promise<void> {
    await this.clearAllSessions(username);
  }

  public createRefreshToken (): RefreshToken {
    return randtoken.uid(256) as RefreshToken;
  }

  public signJWT (props: JWTClaims): JWTToken {
    const claims: JWTClaims = {
      email: props.email,
      username: props.username,
      userId: props.userId,
      isEmailVerified: props.isEmailVerified
    };

    return jwt.sign(claims, secret, {
      expiresIn: tokenExpiryTime
    });
  }

  public decodeJWT (token: string): Promise<JWTClaims> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return resolve(null);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return resolve(decoded);
      });
    });
  }

  private constructKey (username: string, refreshToken: RefreshToken | undefined): string {
    return `refresh-${refreshToken}.${this.jwtHashName}.${username}`;
  }

  public addToken (username: string, refreshToken: RefreshToken | undefined, token: JWTToken | undefined): Promise<any> {
    return this.set(this.constructKey(username, refreshToken), token);
  }

  public async clearAllTokens (): Promise<any> {
    const allKeys = await this.getAllKeys(`*${this.jwtHashName}*`);
    return Promise.all(
      allKeys.map((key) => this.deleteOne(key))
    );
  }

  public async getTokens (username: string): Promise<string[]> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`);
    return keyValues.map((kv) => kv.value);
  }

  public async getToken(username: string, refreshToken: string): Promise<string> {
    return this.getOne(this.constructKey(username, refreshToken));
  }

  public async clearAllSessions (username: string): Promise<any> {
    const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`);
    const keys = keyValues.map((kv) => kv.key);
    return Promise.all(
      keys.map((key) => this.deleteOne(key))
    );
  }
}