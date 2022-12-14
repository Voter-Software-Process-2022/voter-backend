import { errorResponse } from '../schemas/resposne.schema'
import { NextFunction, Request, Response } from 'express'

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user
    if (!user) {
      return res
        .status(401)
        .json(errorResponse('Invalid token or session has expired'))
      // return next(new AppError(`Invalid token or session has expired`, 401))
    }

    next()
  } catch (err: any) {
    next(err)
  }
}
