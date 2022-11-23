import { errorResponse } from '../schemas/resposne.schema'
import { NextFunction, Request, Response } from 'express'
import { findUserById, getUserInfoFromGov } from '../services/user.service'
import redisClient from '../utils/connectRedis'
import { parseJwt, verifyJwt } from '../utils/jwt'
import { JwtToken } from '../repositories/government.repository'

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the token
    let accessToken
    if (req.headers.authorization?.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken
    }

    if (!accessToken) {
      return res.status(401).json(errorResponse('You are not logged in'))
      // return next(new AppError('You are not logged in', 401))
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(accessToken)

    if (!decoded) {
      return res
        .status(401)
        .json(errorResponse(`Invalid token or user doesn't exist`))
      // return next(new AppError(`Invalid token or user doesn't exist`, 401))
    }

    // Check if user has a valid session
    const session = await redisClient.get(decoded.sub)

    if (!session) {
      return res.status(401).json(errorResponse('User session has expired'))
      // return next(new AppError(`User session has expired`, 401))
    }

    // Check if user still exist
    const user = await findUserById(JSON.parse(session)._id)

    if (!user) {
      return res
        .status(401)
        .json(errorResponse('User with that token no longer exist'))
      // return next(new AppError(`User with that token no longer exist`, 401))
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.user = user

    next()
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}

export const deserializeUserV2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get the token
    let accessToken
    if (req.headers.authorization?.startsWith('Bearer')) {
      accessToken = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.accessToken) {
      accessToken = req.cookies.accessToken
    }

    if (!accessToken) {
      return res.status(401).json(errorResponse('You are not logged in'))
      // return next(new AppError('You are not logged in', 401))
    }

    // Validate Access Token
    const decoded = parseJwt<JwtToken>(accessToken)

    if (!decoded) {
      return res
        .status(401)
        .json(errorResponse(`Invalid token or user doesn't exist`))
      // return next(new AppError(`Invalid token or user doesn't exist`, 401))
    }

    // Check if user has a valid session
    const expirationDate = new Date(Number(decoded.exp) * 1000)
    const currentDate = new Date()
    if (currentDate < expirationDate) {
      return res.status(401).json(errorResponse('User session has expired'))
      // return next(new AppError(`User session has expired`, 401))
    }

    // Check if user still exist
    const user = await getUserInfoFromGov(accessToken)

    if (!user) {
      return res
        .status(401)
        .json(errorResponse('User with that token no longer exist'))
      // return next(new AppError(`User with that token no longer exist`, 401))
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.user = user

    next()
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}
