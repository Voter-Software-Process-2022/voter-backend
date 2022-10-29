import dotenv from 'dotenv'
import http from 'http'
import { appConfig } from './utils/config'
import app from '@src/app'
import logger from '@src/utils/logger'
import swaggerDocs from './utils/swagger'
import connectDB from './utils/connectDB'
import { connectRedis } from './utils/connectRedis'
dotenv.config()

const server: http.Server = http.createServer(app)
const PORT: number = appConfig.port

swaggerDocs(app, PORT)

server.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}.`)
  await connectDB()
  await connectRedis()
})
