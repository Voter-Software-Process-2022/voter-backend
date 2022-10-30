import { sign, verify, SignOptions } from 'jsonwebtoken'
import { dbEnvironmentVariables } from '@src/utils/config'

export const signJwt = (
  payload: string | Buffer | object,
  options: SignOptions = {},
) => {
  const privateKey = Buffer.from(
    dbEnvironmentVariables.accessTokenPrivateKey,
    'base64',
  ).toString('ascii')
  return sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      dbEnvironmentVariables.accessTokenPublicKey,
      'base64',
    ).toString('ascii')
    return verify(token, publicKey) as T
  } catch (error) {
    return null
  }
}
