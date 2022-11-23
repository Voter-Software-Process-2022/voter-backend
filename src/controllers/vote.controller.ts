import { CreateVoteRequest } from '../schemas/vote.schema'
import { Request, Response } from 'express'
import {
  ApplyVoteApiResponseEnum,
  ValidateUserApiAsync,
} from '../repositories/government.repository'
import { errorResponse, messageResponse } from '../schemas/resposne.schema'

export const voteHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateVoteRequest>,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  return res.status(200).json(null)
}

export const verifyRightToVoteHandler = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization === undefined)
      return res.status(401).json('You are not logged in')
    const result = await ValidateUserApiAsync(req.headers.authorization)
    console.log(result)
    if (result === ApplyVoteApiResponseEnum.Success)
      return res.status(200).json(messageResponse('Has right'))
    else return res.status(401).json(messageResponse('Token expired'))
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message))
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaXRpemVuSUQiOiIxMjM0NTY3ODkxMjM0IiwiZXhwIjoxNjY5MjIyNTcwLCJpYXQiOjE2NjkyMjA3NzAsImlzcyI6IldvcmtXb3JrV29ya1RlYW0gR292ZXJubWVudCBNb2R1bGUifQ.v_3D7uyJbbDNPFuWPSHRVrmeVS8F8Kcvt97uoEhvyqA
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDaXRpemVuSUQiOiIxMjM0NTY3ODkwMTIzIiwiZXhwIjoxNjY5MjMxODY2LCJpYXQiOjE2NjkyMzAwNjYsImlzcyI6IldvcmtXb3JrV29ya1RlYW0gR292ZXJubWVudCBNb2R1bGUifQ.TIjnQeBc2aH9y8ne2C5dRvUIideft33hL-yHeWvwsJ8
