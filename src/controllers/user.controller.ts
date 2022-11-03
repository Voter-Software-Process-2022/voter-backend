import { errorResponse } from '../schemas/resposne.schema'
import { Request, Response } from 'express'
import { findAllUsers } from '../services/user.service'

export const getMeHandler = (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    return res.status(200).json({
      status: 'success',
      user,
    })
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers()
    return res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    })
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}
