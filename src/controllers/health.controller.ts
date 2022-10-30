import { Request, Response } from 'express'

export function healthCheckHandler(req: Request, res: Response): void {
  res.send('Voter Backend')
}
