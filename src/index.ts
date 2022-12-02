import dotenv from 'dotenv'
import http from 'http'
import { appConfig } from './utils/config'
import app from './app'
import logger from './utils/logger'
import connectDB from './utils/connectDB'
import { connectRedis } from './utils/connectRedis'
dotenv.config()

const server: http.Server = http.createServer(app)
const PORT: number = appConfig.port

server.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}.`)
  // await connectDB()
  await connectRedis()
  if (process.env.IS_DOCKER === null) logger.info('Docker')
})
