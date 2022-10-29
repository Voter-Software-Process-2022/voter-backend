import { createClient } from 'redis'
import logger from '@src/utils/logger'

const redisUrl = `redis://localhost:6379`
const redisClient = createClient({
  url: redisUrl,
})

const connectRedis = async () => {
  try {
    await redisClient.connect()
    logger.info('Redis client connected...')
  } catch (err: any) {
    logger.error(err.message)
    setTimeout(connectRedis, 5000)
  }
}

connectRedis();

redisClient.on('error', (err) => {
  logger.error(err)
});

export default redisClient
