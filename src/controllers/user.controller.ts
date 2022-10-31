import { NextFunction, Request, Response } from 'express'
import { findAllUsers } from '../services/user.service'

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const user = res.locals.user
    console.log(user)
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    })
  } catch (err: any) {
    next(err)
  }
}

export const getAllUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await findAllUsers()
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    })
  } catch (err: any) {
    next(err)
  }
}
