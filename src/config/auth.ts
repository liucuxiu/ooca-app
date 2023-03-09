const authConfig = {
  secret: 'liucuxiu',
  tokenExpiryTime: 3000, // seconds => 5 minutes
  redisConnectionString: 'redis://redis:6379'
};

export { authConfig };