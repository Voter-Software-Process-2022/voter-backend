import { dbEnvironmentVariables } from '../utils/config'
import logger from '../utils/logger'
import { ObjectId, Document, Filter, FindOptions, MongoClient } from 'mongodb'
export class DatabaseModel implements Document {
  _id?: ObjectId
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}
class MongoDbClient {
  private readonly _uri: string
  private _client: MongoClient | undefined
  private readonly databaseName: string
  private readonly collectionName: string

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
    query: Record<string, any>,
    options?: FindOptions<Document>,
  ) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const data = await collection.findOne<T>(query, options)
      await client.close()
      return data
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async findMany<T extends Document>(
    query: Record<string, any>,
    options?: FindOptions<Document>,
  ) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const data = await collection.find<T>(query, options).toArray()
      await client.close()
      return data
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async insertOne(data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.insertOne(data)
      await client.close()
      logger.info(
        `A document was inserted with the _id: ${result.insertedId.toString()}`,
      )
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async insertMany(data: DatabaseModel[]) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.insertMany(data)
      await client.close()
      logger.info(`${result.insertedCount} documents were inserted`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async updateOne(
    filter: Filter<Document>,
    data: DatabaseModel,
    isUpsert = true,
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
      await client.close()
      logger.info(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      )
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async updateMany(filter: Filter<Document>, data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.updateMany(filter, { $set: data })
      const modifiedCount: string = result.modifiedCount.toString()
      await client.close()
      logger.info(`Updated ${modifiedCount} documents`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async replaceOne(filter: Filter<Document>, data: DatabaseModel) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.replaceOne(filter, data)
      const modifiedCount: string = result.modifiedCount.toString()
      await client.close()
      logger.info(`Modified ${modifiedCount} document(s)`)
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }

  async deleteOne(query: Record<string, any>) {
    const client = await this.getInstance()
    try {
      const database = client.db(this.databaseName)
      const collection = database.collection(this.collectionName)
      const result = await collection.deleteOne(query)
      await client.close()
      if (result.deletedCount === 1) {
        logger.info('Successfully deleted one document.')
      } else {
        logger.info('No documents matched the query. Deleted 0 documents.')
      }
      return result
    } catch (e) {
      logger.error(`Error...Disconnecting`)
      await client.close()
      throw e
    }
  }
}

export default MongoDbClient
