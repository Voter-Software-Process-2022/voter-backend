import app from '../../src/app'
import request from 'supertest'
import { CreateVoteRequest } from '../../src/schemas/vote.schema'
import {
  ApplyVoteApiResponseEnum,
  UserInformationApiResponse,
} from '../../src/repositories/government.repository'
import { AxiosResponse } from 'axios'
import {
  CandidateResponse,
  GetMpCandidateInfo,
} from '../../src/repositories/electioncommittee.repository'
import MongoDbClient from '../../src/repositories/mongodb.repository'
import { FindOptions } from 'mongodb'
import { VoteTopic } from '../../src/models/vote.model'
import dotenv from 'dotenv'
dotenv.config()

const PAYLOAD: CreateVoteRequest = {
  ballotId: 'test1234',
  voteTopicId: 1,
  candidateId: 1,
  areaId: 1,
}

const mockAxiosResponse: AxiosResponse<CandidateResponse> = {
  data: {
    id: 1,
    name: 'string',
    pictureUrl: 'string',
    area_id: 1,
    party_id: 1,
  },
  status: 0,
  statusText: '',
  headers: {},
  config: {},
}

const mockUserInformation: UserInformationApiResponse = {
  CitizenID: '2222222222222',
  LazerID: 'JT9999999998',
  Name: 'Test',
  Lastname: 'Tester',
  Birthday: new Date(1990, 1, 1),
  Nationality: 'Thai',
  DistricID: 1,
}

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaXRpemVuSUQiOiIyMjIyMjIyMjIyMjIyIiwiZXhwIjozMjUwMTA2NDkxMywiaWF0IjoxNjY5OTEzODcxLCJpc3MiOiJXb3JrV29ya1dvcmtUZWFtIEdvdmVybm1lbnQgTW9kdWxlIn0.FkO1koawNy-C2HVBKYurQEJXDv8ZhIRw5eE2U6rZ0WM'

const isDocker = (condition: boolean | undefined | string) => {
  if (condition === null) return false
  return Boolean(condition) ? true : false
}
jest.mock('../../src/repositories/mongodb.repository', () => {
  const originalModule = jest.requireActual(
    '../../src/repositories/mongodb.repository',
  )
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn().mockImplementation(() => {
      return {
        insertOne: jest.fn(async () => {
          return { insertedId: 'test123' }
        }),
        findOne: jest.fn(
          async (
            query: Record<string, any>,
            options?: FindOptions<Document>,
          ) => {
            if (query.citizenId !== undefined)
              return {
                citizenId: '1234567890123',
                _id: 'abc1234',
              }
            else if (query.voteTopicId !== undefined) return null
          },
        ),
      }
    }),
  }
})

jest.mock('../../src/repositories/government.repository', () => {
  return {
    __esModule: true,
    ApplyVoteApiAsync: jest.fn(
      async (token: string) => ApplyVoteApiResponseEnum.Success,
    ),
    GetUserInformationApiAsync: jest.fn(
      async (token: string) => mockUserInformation,
    ),
  }
})

jest.mock('../../src/repositories/electioncommittee.repository', () => {
  return {
    __esModule: true,
    GetMpCandidateInfo: jest.fn(async (id: number) => mockAxiosResponse),
    sendVoteToEc: jest.fn(
      async (voteTopicId: VoteTopic, candidateId: number, areaId: number) =>
        null,
    ),
  }
})

describe('Test Vote Process', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('Vote with properly topic id and candidate id should be success', async () => {
    const response = await request(app)
      .post('/api/vote/submit')
      .send({ ballotId: 'abc1234', voteTopicId: 1, candidateId: 1, areaId: 1 })
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(response.status).toBe(200)
  })

  it('Vote NO with properly topic id should be success', async () => {
    const response = await request(app)
      .post('/api/vote/no')
      .send({ ballotId: 'abc1234', voteTopicId: 1, areaId: 1 })
      .set('Authorization', `Bearer ${TOKEN}`)
    expect(response.status).toBe(200)
  })

})
