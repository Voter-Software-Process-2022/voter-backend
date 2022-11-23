import dotenv from 'dotenv'
dotenv.config()

export interface IAppConfig {
  port: number
  accessTokenExpiresIn: number
  origin: string
  useMock: boolean
}

export interface DBEnvironmentVariables {
  dbName: string
  dbPass: string
  dbUri: string
  accessTokenPrivateKey: string
  accessTokenPublicKey: string
}

export interface RedisEnvironmentVariables {
  host: string
  port: number
  password: string
  url: string
}

export interface IModuleHosts {
  government: string
  electionCommittee: string
}

export const appConfig: IAppConfig = {
  port: Number(process.env.PORT ?? 8000),
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN ?? 15),
  origin: process.env.ORIGIN ?? 'http://localhost:8000',
  useMock: Boolean(process.env.USE_MOCK ?? false),
}

export const dbEnvironmentVariables: DBEnvironmentVariables = {
  dbName: String(process.env.MONGODB_USERNAME),
  dbPass: String(process.env.MONGODB_PASSWORD),
  dbUri: String(process.env.MONGODB_URI),
  accessTokenPrivateKey: String(process.env.ACCESS_TOKEN_PRIVATE_KEY),
  accessTokenPublicKey: String(process.env.ACCESS_TOKEN_PUBLIC_KEY),
}

export const redisEnvironmentVariables: RedisEnvironmentVariables = {
  host: String(process.env.REDIS_HOSTNAME),
  port: Number(process.env.REDIS_PORT),
  password: String(process.env.REDIS_PASSWORD),
  url: String(process.env.REDIS_URL),
}

export const moduleHosts: IModuleHosts = {
  government: process.env.GOVERNMENT_HOST ?? '',
  electionCommittee: process.env.ELECTION_COMMITTEE_HOST ?? '',
}
