import { appConfig, IAppConfig } from '../../src/utils/config'
import dotenv from 'dotenv'

dotenv.config()

const config: IAppConfig = {
  port: Number(process.env.PORT ?? 8000),
  accessTokenExpiresIn: 0,
  origin: [''],
  useMock: false
}

describe('Test load config from .env', () => {
  it('should equal app config', async () => {
    expect(config.port).toBe(appConfig.port)
  })
})
