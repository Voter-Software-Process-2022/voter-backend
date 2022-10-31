import { redisEnvironmentVariables } from '@src/utils/config'
import { createClient } from 'redis'
import logger from '@src/utils/logger'

const password = redisEnvironmentVariables.password
const host = redisEnvironmentVariables.host
const port = redisEnvironmentVariables.port

const redisClient = createClient({
  url: `redis://:${password}@${host}:${port}`,
})

export const connectRedis = async () => {
  try {
    await redisClient.connect()
    logger.info('Redis client connected...')
  } catch (err: any) {
    logger.error(err.message)
    setTimeout(connectRedis, 5000)
  }
}

redisClient.on('error', (err) => {
  logger.error(err)
})

export default redisClient
