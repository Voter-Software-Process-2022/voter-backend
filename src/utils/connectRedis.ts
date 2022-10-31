import { redisEnvironmentVariables } from '../utils/config'
import { createClient } from 'redis'
import logger from './logger'

// const redisClient = createClient({
//   url: redisEnvironmentVariables.url,
// })

const redisClient = createClient({
  socket: {
    host: redisEnvironmentVariables.host,
    port: redisEnvironmentVariables.port,
  },
  password: redisEnvironmentVariables.password,
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
