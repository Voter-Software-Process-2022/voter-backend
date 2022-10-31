import { redisEnvironmentVariables } from '../utils/config'
import { createClient } from 'redis'
import logger from './logger'

const redisUrl = `redis://:${redisEnvironmentVariables.password}@${redisEnvironmentVariables.host}:${redisEnvironmentVariables.port}`

const redisClient = createClient({
  url: redisUrl,
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
