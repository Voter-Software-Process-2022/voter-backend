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

export interface IDatabase {
  findOne: (
    databaseName: string,
    collectionName: string,
    columnName: string,
    keyword: string,
  ) => Promise<WithId<Document> | null>
}

export class Database {
  async findOne(
    databaseName: string,
    collectionName: string,
    columnName: string,
    keyword: string,
  ) {
    try {
      await connectDB()
      const database = mongoClient.db(databaseName)
      const collection = database.collection(collectionName)
      const query = { [columnName]: keyword }
      const data = await collection.findOne(query)
      await disconnectDB()
      logger.info(data)
      return data
    } catch (e) {
      await disconnectDB()
      return null
    }
  }
}
