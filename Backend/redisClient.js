// const redis = require('redis');
// const { redisPort, redisHost } = require('./redis-config');
// const redisClient = redis.createClient({ port: redisPort, host: redisHost });
// redisClient.on('connect', (err) => {
//  if (err) {
//    console.log('Error while connecting to Redis server');
//  } else {
//    console.log('Redis Server Connected');
//  }
// });

module.exports = {
  // This is AWS Redis instance IP. Connect to this if you don't want to connect to local Redis	  // This is AWS Redis instance IP. Connect to this if you don't want to connect to local Redis
  // redisHost: "123.123.123.123",
  redisHost: 'redis-10162.c60.us-west-1-2.ec2.cloud.redislabs.com',
  password: 'Dishant@1',
  // redisPort: 6379,
  redisPort: 10162,
};
