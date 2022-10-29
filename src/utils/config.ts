import dotenv from 'dotenv'
dotenv.config()

export interface IAppConfig {
  port: number
  accessTokenExpiresIn: number,
  origin: string,
}

export interface EnvironmentVariables {
  dbName: string
  dbPass: string
  accessTokenPrivateKey: string
  accessTokenPublicKey: string
}

export const appConfig: IAppConfig = {
  port: Number(process.env.PORT) ?? 8000,
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRES_IN) ?? 15,
  origin: String(process.env.ORIGIN) ?? 'http://localhost:3000',
}

export const customEnvironmentVariables: EnvironmentVariables = {
  dbName: String(process.env.MONGODB_USERNAME),
  dbPass: String(process.env.MONGODB_PASSWORD),
  accessTokenPrivateKey: String(process.env.ACCESS_TOKEN_PRIVATE_KEY),
  accessTokenPublicKey: String(process.env.ACCESS_TOKEN_PUBLIC_KEY),
}
