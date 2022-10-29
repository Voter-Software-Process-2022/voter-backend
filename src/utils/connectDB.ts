import { customEnvironmentVariables } from '@src/utils/config'
import mongoose from 'mongoose'
import logger from '@src/utils/logger'

const dbName: string = customEnvironmentVariables.dbName
const dbPass: string = customEnvironmentVariables.dbPass

const uri = `mongodb+srv://${dbName}:${dbPass}@voter-software-process.l03pvct.mongodb.net/?retryWrites=true&w=majority`

async function connectDB() {
  try {
    await mongoose.connect(uri)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error(error)
    setTimeout(connectDB, 5000)
  }
}

export default connectDB
