import { dbEnvironmentVariables } from '../utils/config'
import logger from '../utils/logger'
import { Filter, FindOptions, MongoClient, ObjectId, WithId } from 'mongodb'
export class DatabaseModel extends Document {
  _id?: ObjectId
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}
class MongoDbClient {
  private readonly _uri: string
  private _client: MongoClient | undefined
  private databaseName: string
  private collectionName: string

  constructor(databaseName: string, collectionName: string) {
    this._uri = dbEnvironmentVariables.dbUri
    this.databaseName = databaseName
    this.collectionName = collectionName
  }

  private async getInstance() {
    if (!this._client) {
      logger.info('Initialized new client...')
      this._client = new MongoClient(this._uri)
    }
    await this._client.connect()
    logger.info('Client connected')
    return this._client
  }

  async findOne<T extends Document>(
    query: DatabaseModel,
    options?: FindOptions<Document>,
  ) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const data = await collection.findOne<T>(query, options)
      client.close()
      return data
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async findMany<T extends Document>(
    query: DatabaseModel,
    options?: FindOptions<Document>,
  ) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const data = await collection.find<T>(query, options).toArray()
      client.close()
      return data
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async insertOne(data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.insertOne(data)
      client.close()
      logger.info(`A document was inserted with the _id: ${result.insertedId}`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async insertMany(data: DatabaseModel[]) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.insertMany(data)
      client.close()
      logger.info(`${result.insertedCount} documents were inserted`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async updateOne(
    filter: Filter<Document>,
    data: DatabaseModel,
    isUpsert: bool = true,
  ) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.updateOne(
        filter,
        { $set: data },
        { upsert: isUpsert },
      )
      client.close()
      logger.info(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      )
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async updateMany(filter: Filter<Document>, data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.updateMany(filter, { $set: data })
      client.close()
      logger.info(`Updated ${result.modifiedCount} documents`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async replaceOne(filter: Filter<Document>, data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.replaceOne(filter, data)
      client.close()
      logger.info(`Modified ${result.modifiedCount} document(s)`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async deleteOne(query: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.deleteOne(query)
      client.close()
      if (result.deletedCount === 1) {
        logger.info('Successfully deleted one document.')
      } else {
        logger.info('No documents matched the query. Deleted 0 documents.')
      }
      logger.info(`Modified ${result.modifiedCount} document(s)`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      client.close()
      throw e
    }
  }

  async deleteMany()
}

export default MongoDbClient
