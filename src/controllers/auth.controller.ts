import { appConfig } from '@src/utils/config'
import { CookieOptions, NextFunction, Request, Response } from 'express'
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema'
import { createUser, findUser, signToken } from '../services/user.service'
import AppError from '../utils/appError'
import logger from '../utils/logger'

// Exclude this fields from the response
export const excludedFields = ['password']

const accessTokenExpiresIn: number = appConfig.accessTokenExpiresIn

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
  next: NextFunction,
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
      data: {
        user,
      },
    })
  } catch (err: any) {
    logger.info(err.code)
    next(err)
  }
}

export const loginHandler = async (
  req: Request<Record<string, never>, Record<string, never>, LoginUserInput>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email })

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401))
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
    next(err)
  }
}
