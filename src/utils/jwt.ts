import jwt, { SignOptions } from 'jsonwebtoken';
import { customEnvironmentVariables } from "@src/utils/config";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    customEnvironmentVariables.accessTokenPrivateKey,
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
        customEnvironmentVariables.accessTokenPublicKey,
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
