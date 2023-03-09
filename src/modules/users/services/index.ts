import { RedisAuthService } from './implementations/redisAuthService';
import { redisConnection } from './implementations/redisConnection';

const authService = new RedisAuthService(
  redisConnection
);

export { authService };