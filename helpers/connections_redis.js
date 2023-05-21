
const redis = require("redis");
const PORT_REDIS = process.env.PORT_REDIS;
const HOST_REDIS = process.env.HOST_REDIS;

// async function start() {
//   await client.set('mykey', 'Hello from node redis');
//   const myKeyValue = await client.get('mykey');
//   console.log(myKeyValue); 
//   return client;
// }
// start();

const client = redis.createClient({
  socket: {
    host: HOST_REDIS,
    port: PORT_REDIS,
  },
  // password: process.env.REDIS_PASSWORD,
});

async function startRedis() {
  await client.connect();
}


module.exports={
  client,
  startRedis
};