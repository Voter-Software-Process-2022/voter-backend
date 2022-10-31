import { dbEnvironmentVariables } from './config'
import mongoose from 'mongoose'
import logger from './logger'

const dbName: string = dbEnvironmentVariables.dbName
const dbPass: string = dbEnvironmentVariables.dbPass

const uri = `mongodb+srv://${dbName}:${dbPass}@voter-software-process.hrewxlq.mongodb.net/?retryWrites=true&w=majority`

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
