import { appConfig } from '../utils/config'
import { CookieOptions, Request, Response } from 'express'
import {
  CreateUserInput,
  LoginUserInput,
  LoginUserInputV2,
} from '../schemas/user.schema'
import { createUser, findUser, signToken } from '../services/user.service'
import logger from '../utils/logger'
import { errorResponse } from '../schemas/resposne.schema'
import { LoginError } from '../utils/appError'
import { AuthenticationApiAsync } from '../repositories/government.repository'
import MongoDbClient from '../repositories/mongodb.repository'
import { User, UserReference } from '@src/models/user.model'

// Exclude this fields from the response
export const excludedFields = ['password']

const accessTokenExpiresIn: number = appConfig.accessTokenExpiresIn

const mongoClient = new MongoDbClient('auth', 'user_ref')

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(Date.now() + accessTokenExpiresIn * 60 * 1000),
  maxAge: accessTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
}

// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  accessTokenCookieOptions.secure = true

export const registerHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateUserInput>,
  res: Response,
): Promise<void> => {
  try {
    const user = await createUser({
      citizenID: req.body.citizenID,
      laserCode: req.body.laserCode,
      email: req.body.email,
      password: req.body.password,
    })

    res.status(201).json({
      status: 'success',
      user,
    })
  } catch (err: any) {
    logger.error(err.message)
    res.status(500).json(errorResponse(err.message))
  }
}

export const loginHandler = async (
  req: Request<Record<string, never>, Record<string, never>, LoginUserInput>,
  res: Response,
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email })

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return res.status(401).json(errorResponse('Invalid email or password'))
      // return next(new AppError('Invalid email or password', 401))
    }

    // Create an Access Token
    const { accessToken } = await signToken(user)

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    })

    // Send Access Token
    res.status(200).json({
      status: 'success',
      accessToken,
    })
  } catch (err: any) {
    logger.error(err.message)
    res.status(500).json(errorResponse(err.message))
  }
}

export const loginHandlerV2 = async (
  req: Request<Record<string, never>, Record<string, never>, LoginUserInputV2>,
  res: Response,
) => {
  try {
    if (appConfig.useMock) {
      if (
        req.body.citizenId === '1234567890123' &&
        req.body.laserId === 'JT9999999999'
      )
        return res.status(200).json({
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaXRpemVuSUQiOiIxMjM0NTY3ODkwMTIzIiwiZXhwIjoxNjY4NjkzODQwLCJpYXQiOjE2Njg2OTIwNDAsImlzcyI6IldvcmtXb3JrV29ya1RlYW0gR292ZXJubWVudCBNb2R1bGUifQ.n3J4hOTFUNHZ5BRMLoPYJB_IpdhaZz6df3ivx1K1j4U',
        })
      else throw new LoginError()
    }
    const response = await AuthenticationApiAsync(
      req.body.citizenId,
      req.body.laserId,
    )
    // const currentUser = await mongoClient.findOne<UserReference>({
    //   citizenId: req.body.citizenId,
    // })
    // if (currentUser === null) {
    //   const userRerference: UserReference = {
    //     citizenId: req.body.citizenId,
    //   }
    //   await mongoClient.insertOne(userRerference)
    // }
    return res.status(200).json(response)
  } catch (e: any) {
    if (e instanceof LoginError) return res.status(400).json(null)
    else return res.status(500).json(errorResponse(e.message))
  }
}
