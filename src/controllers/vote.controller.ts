import {
  CreateVoteRequest,
  VoteAvailableResponse,
} from '../schemas/vote.schema'
import { Request, Response } from 'express'
import {
  ApplyVoteApiResponseEnum,
  ValidateUserApiAsync,
} from '../repositories/government.repository'
import { errorResponse, messageResponse } from '../schemas/resposne.schema'
import MongoDbClient from '../repositories/mongodb.repository'
import { UserReference } from '../models/user.model'
import { VoteResult, VoteTopic } from '../models/vote.model'
import {
  CandidateResponse,
  GetMpCandidateInfo,
  PartyResponse,
} from '../repositories/electioncommittee.repository'
import logger from '../utils/logger'

const mongoClientUser = new MongoDbClient('auth', 'user_ref')
const mongoClientVote = new MongoDbClient('vote', 'ballot')

export const voteHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateVoteRequest>,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userRef = await mongoClientUser.findOne<UserReference>({
    citizenId: res.locals.user.CitizenID,
  })
  if (userRef === null || userRef._id === undefined)
    return res.status(401).json(errorResponse("You're not logged in"))
  let candidateInfo: CandidateResponse | PartyResponse
  if (req.body.voteTopicId === VoteTopic.Mp) {
    const result = await GetMpCandidateInfo(req.body.candidateId)
    if (result.data.areaId === res.locals.user.DistricID) {
      candidateInfo = result.data
    }
  } else if (req.body.voteTopicId === VoteTopic.Party) {
    return res.status(500).json(null)
  }
  const voteResult: VoteResult = {
    timestamp: new Date(),
    userReference: userRef._id,
    voteTopicId: req.body.voteTopicId,
    CandidateId: req.body.candidateId,
    candidateInfo: undefined,
  }

  const response = await mongoClientVote.insertOne(voteResult)
  return res.status(200).json(messageResponse(response.insertedId.toString()))
}

export const verifyRightToVoteHandler = async (req: Request, res: Response) => {
  try {
    if (req.headers.authorization === undefined)
      return res.status(401).json('You are not logged in')
    const result = await ValidateUserApiAsync(req.headers.authorization)

    if (result === ApplyVoteApiResponseEnum.Success) {
      logger.info('User validation success, defining available vote...')
      const query = {
        citizenId: res.locals.user.CitizenID.toString(),
      }
      const userRef = await mongoClientUser.findOne<UserReference>(query)
      if (userRef === null) {
        logger.error('User not found in reference...')
        return res.status(401).json(messageResponse('User not found'))
      }
      const availableVoteTopic: VoteAvailableResponse[] = []
      const voteMp = await mongoClientVote.findOne<VoteResult>({
        voteTopicId: VoteTopic.Mp,
        userId: userRef._id,
      })
      if (voteMp === null) {
        logger.info('MP Vote for this user not found, adding to available...')
        availableVoteTopic.push({
          voteTopicId: VoteTopic.Mp,
          voteTopicName: 'MP',
        })
      }
      const voteParty = await mongoClientVote.findOne<VoteResult>({
        voteTopicId: VoteTopic.Party,
        userId: userRef._id,
      })
      if (voteParty === null) {
        logger.info(
          'Party Vote for this user not found, adding to available...',
        )
        availableVoteTopic.push({
          voteTopicId: VoteTopic.Party,
          voteTopicName: 'Party',
        })
      }
      return res.status(200).json(availableVoteTopic)
    }
    return res.status(401).json(messageResponse('Token expired'))
  } catch (err: any) {
    res.status(500).json(errorResponse(err.message))
  }
}
