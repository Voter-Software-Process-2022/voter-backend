import { appConfig } from '..//utils/config'
import { omit } from 'lodash'
import { FilterQuery, QueryOptions } from 'mongoose'
import userModel, { User } from '../models/user.model'
import { excludedFields } from '../controllers/auth.controller'
import { signJwt } from '../utils/jwt'
import redisClient from '../utils/connectRedis'
import { DocumentType } from '@typegoose/typegoose'
import logger from '../utils/logger'
import {
  AuthenticationApiAsync,
  AuthenticationApiResponse,
} from '../repositories/government.repository'
import { LoginError } from '../utils/appError'

const accessTokenExpiresIn: number = appConfig.accessTokenExpiresIn

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  logger.info('Creating user to MongoDB')
  const user = await userModel.create(input)
  logger.info('Returning')
  return omit(user.toJSON(), excludedFields)
}

// Find User by Id
export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean()
  return omit(user, excludedFields)
}

// Find All users
export const findAllUsers = async () => {
  const users = await userModel.find()
  return users
}

// Find one user by any fields
export const findUser = async (
  query: FilterQuery<User>,
  options: QueryOptions = {},
) => {
  const user = await userModel.findOne(query, {}, options).select('+password')
  return user
}

// Sign Token
export const signToken = async (user: DocumentType<User>) => {
  // Sign the access token
  const accessToken = signJwt(
    { sub: user._id },
    {
      expiresIn: `${accessTokenExpiresIn}m`,
    },
  )

  // Create a Session
  try {
    await redisClient.set(String(user._id), JSON.stringify(user))
    await redisClient.expire(String(user._id), 60 * 60)
  } catch (err) {
    logger.info(err)
  }

  // Return access token›
  return { accessToken }
}

export const loginWithGov = async (
  citizenId: string,
  laserId: string,
): Promise<AuthenticationApiResponse> => {
  const response = await AuthenticationApiAsync(citizenId, laserId)
  if (response.status === 200) return response.data
  else if (response.status === 400) throw new LoginError()
  else throw new Error('Unknown response from Government')
}
