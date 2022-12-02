import MongoDbClient, {
  DatabaseModel,
} from '../../src/repositories/mongodb.repository'
import dotenv from 'dotenv'
dotenv.config()

class MockModel extends DatabaseModel {
  key!: string
}

const itif = (condition: boolean | undefined | string) => {
  if (condition === null) return it.skip
  return Boolean(condition) ? it : it.skip
}

describe('Test custom MongoDB connection class', () => {
  itif(process.env.IS_DOCKER)('should be able to find', async () => {
    const db = new MongoDbClient('test', 'test1')
    const response = await db.findOne({ key: 'value' })
    expect(response).toBeNull()
  })

  itif(process.env.IS_DOCKER)('should be able to insert', async () => {
    const db = new MongoDbClient('test', 'unit')
    const mockData = new MockModel()
    mockData.key = 'Test'
    const response = await db.insertOne(mockData)
    expect(response.insertedId).not.toBeNull()
  })

  itif(process.env.IS_DOCKER)('should be able to found if exists', async () => {
    const db = new MongoDbClient('test', 'unit')
    const mockData = new MockModel()
    mockData.key = 'This'
    await db.insertOne(mockData)
    const response = await db.findOne<MockModel>({ key: mockData.key })
    expect(response?.key).not.toBeNull()
    expect(response?.key).toBe(mockData.key)
  })
})
