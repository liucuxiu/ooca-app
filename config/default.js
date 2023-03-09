module.exports = {
  auth: {
    secret: process.env.AUTH_REDIS_SECRET || 'liucuxiu',
    tokenExpiryTime: 3000,
    redisConnectionString: process.env.AUTH_REDIS_CONNECTION || 'redis://redis:6379'
  },
  mongo: {
    uri: process.env.MONGO_CONNECTION || 'mongodb://mongo:27017/ooca-app'
  },
  app: {
    port: process.env.APP_PORT || 3000
  }
};