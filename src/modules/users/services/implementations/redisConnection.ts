import * as redis from 'redis';
import config from 'config';

const redisConnectionString: string = config.get('auth.redisConnectionString');
console.log(redisConnectionString)
const redisConnection = redis.createClient({
  url: redisConnectionString
});

redisConnection.on('connect', () => {
  console.log('[Redis]: Connected to redis server at redis:6379');
});
redisConnection.connect().then(r => {
  console.log('[Redis]: Connected to redis server at redis:6379 ok');

});

export { redisConnection };
