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

export default redisClient
