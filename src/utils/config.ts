import dotenv from 'dotenv'
dotenv.config()

const getAllowedOrigin = (): Array<string | RegExp> | undefined => {
  if (process.env.ORIGINS === undefined) return undefined
  const originsEnv: string[] = process.env.ORIGINS.split(',')
  const allowedOrigins: Array<string | RegExp> = []
  originsEnv.forEach((origin) => {
    if (origin.startsWith('^') && origin.endsWith('$')) {
      allowedOrigins.push(new RegExp(origin))
    } else {
      allowedOrigins.push(origin)
    }
  })
  return allowedOrigins
}

export interface IAppConfig {
  port: number
  accessTokenExpiresIn: number
  origins: Array<string | RegExp>
  useMock: boolean
}

export interface DBEnvironmentVariables {
  dbName: string
  dbPass: string
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
  origins: getAllowedOrigin() ?? ['http://localhost:8000'],
  useMock: Boolean(process.env.USE_MOCK ?? false),
}

export const dbEnvironmentVariables: DBEnvironmentVariables = {
  dbName: String(process.env.MONGODB_USERNAME),
  dbPass: String(process.env.MONGODB_PASSWORD),
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
