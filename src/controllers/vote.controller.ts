import { CreateVoteRequest } from '@src/schemas/vote.schema'
import { Request, Response } from 'express'

export const voteHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateVoteRequest>,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  return res.status(200).json(null)
}
