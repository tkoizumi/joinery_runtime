import { createClient } from 'redis';

if(!process.env.REDIS_PSWD || !process.env.REDIS_USER) {
  throw new Error('REDIS USER or PASSWORD not defined')
}

const REDIS_PORT = 25061;
const REDIS_HOST = 'db-redis-nyc3-joinery-do-user-10681987-0.b.db.ondigitalocean.com';
const REDIS_PSWD = process.env.REDIS_PSWD;
const REDIS_USER = process.env.REDIS_USER;
const url = `redis://${REDIS_USER}:${REDIS_PSWD}@${REDIS_HOST}:${REDIS_PORT}`;

const redisClient = createClient({
  url,
  socket: {
    tls: true
  }
});

const connect_redis = async () => {
  if(!redisClient.isOpen){
    await redisClient.connect();
  }
}

const close_redis = async () => {
  if(redisClient.isOpen){
    await redisClient.quit();
  }
}

export const rPush = async (listName: string, value: string) => {
  await connect_redis();
  await redisClient.rPush(listName, value);
  await close_redis();
};

export const rPop = async (listName: string) => {
  await connect_redis();
  await redisClient.rPop(listName);
  await close_redis();
};

export const lRange = async (listName: string, start: number, end: number) => {
  await connect_redis();
  const list = await redisClient.lRange(listName, start, end);
  await close_redis();
  return list;
};
