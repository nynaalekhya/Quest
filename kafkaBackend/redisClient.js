const redis = require('redis');

const { redisPort, redisHost, password } = require('./redis-config');

const redisClient = redis.createClient({ port: redisPort, host: redisHost, password });
redisClient.on('connect', (err) => {
  if (err) {
    console.log('Error while connecting to Redis server');
  } else {
    console.log('Redis Server Connected');
  }
});
module.exports = redisClient;
