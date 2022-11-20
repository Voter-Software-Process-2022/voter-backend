import { dbEnvironmentVariables } from '../utils/config'
import logger from '../utils/logger'
import { MongoClient, WithId } from 'mongodb'

const dbName: string = dbEnvironmentVariables.dbName
const dbPass: string = dbEnvironmentVariables.dbPass

const uri = `mongodb+srv://${dbName}:${dbPass}@voter-software-process.hrewxlq.mongodb.net/?retryWrites=true&w=majority`

const mongoClient = new MongoClient(uri)

async function connectDB() {
  try {
    await mongoClient.connect()
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error(error)
  }
}

export async function disconnectDB() {
  await mongoClient.close()
  logger.info('MongoDB disconnected')
}

export class Database {
  async findOne(
    databaseName: string,
    collectionName: string,
    query: Record<string, any>,
  ) {
    try {
      await connectDB()
      const database = mongoClient.db(databaseName)
      const collection = database.collection(collectionName)
      const data = await collection.findOne(query)
      await disconnectDB()
      logger.info(data)
      return data
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await disconnectDB()
      return null
    }
  }
}
