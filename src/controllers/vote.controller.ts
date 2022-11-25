import {
  CreateVoteNoRequest,
  CreateVoteRequest,
  VoteAvailableResponse,
} from '../schemas/vote.schema'
import { Request, Response } from 'express'
import {
  ApplyVoteApiAsync,
  ApplyVoteApiResponseEnum,
  ValidateUserApiAsync,
} from '../repositories/government.repository'
import { errorResponse, messageResponse } from '../schemas/resposne.schema'
import MongoDbClient from '../repositories/mongodb.repository'
import { UserReference } from '../models/user.model'
import { VoteResult, VoteTopic } from '../models/vote.model'
import {
  CandidateResponse,
  GetAllMpCandidatesInArea,
  GetMpCandidateInfo,
  GetPartyInformation,
  PartyResponse,
  sendVoteToEc,
} from '../repositories/electioncommittee.repository'
import logger from '../utils/logger'

const mongoClientUser = new MongoDbClient('auth', 'user_ref')
const mongoClientVote = new MongoDbClient('vote', 'ballot')

export const voteHandler = async (
  req: Request<Record<string, never>, Record<string, never>, CreateVoteRequest>,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  const userRef = await mongoClientUser.findOne<UserReference>({
    citizenId: res.locals.user.CitizenID.toString(),
  })
  if (
    userRef === null ||
    userRef._id === undefined ||
    req.headers.authorization === undefined
  )
    return res.status(401).json(errorResponse("You're not logged in"))
  let candidateInformation: CandidateResponse | PartyResponse
  const voteMp = await mongoClientVote.findOne<VoteResult>({
    voteTopicId: VoteTopic.Mp,
    userReference: userRef._id,
  })
  const voteParty = await mongoClientVote.findOne<VoteResult>({
    voteTopicId: VoteTopic.Party,
    userReference: userRef._id,
  })
  if (req.body.voteTopicId === VoteTopic.Mp) {
    if (voteMp !== null) {
      return res.status(401).json(errorResponse('You already voted this topic'))
    }
    const mpResult = await GetMpCandidateInfo(req.body.candidateId)
    if (mpResult.data.area_id === res.locals.user.DistricID) {
      candidateInformation = mpResult.data
    } else {
      logger.error(
        `Area id does not match, selected: ${mpResult.data.area_id}, user: ${res.locals.user.DistricID}`,
      )
      return res.status(401).json(errorResponse('Area does not match'))
    }
    if (voteParty !== null) {
      // Send voted to Gov
      await ApplyVoteApiAsync(req.headers.authorization)
    }
  } else if (req.body.voteTopicId === VoteTopic.Party) {
    if (voteParty !== null) {
      return res.status(401).json(errorResponse('You already voted this topic'))
    }
    const partyResult = await GetPartyInformation(req.body.candidateId)
    candidateInformation = partyResult.data
    if (voteMp !== null) {
      // Send voted to Gov
      await ApplyVoteApiAsync(req.headers.authorization)
    }
  } else return res.status(401).json(errorResponse('Vote topic unavailable'))
  const voteResult: VoteResult = {
    timestamp: new Date(),
    userReference: userRef._id,
    ballotId: req.body.ballotId,
    voteTopicId: req.body.voteTopicId,
    CandidateId: req.body.candidateId,
    areaId: req.body.areaId,
    candidateInfo: candidateInformation,
  }

  const response = await mongoClientVote.insertOne(voteResult)
  await sendVoteToEc(
    req.body.voteTopicId,
    req.body.candidateId,
    req.body.areaId,
  )
  return res.status(200).json(messageResponse(response.insertedId.toString()))
}

export const voteNoHandler = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    CreateVoteNoRequest
  >,
  res: Response,
) => {
  const userRef = await mongoClientUser.findOne<UserReference>({
    citizenId: res.locals.user.CitizenID.toString(),
  })
  if (userRef === null || userRef._id === undefined)
    return res.status(401).json(errorResponse("You're not logged in"))
  if (req.body.voteTopicId === VoteTopic.Mp) {
    const voteMp = await mongoClientVote.findOne<VoteResult>({
      voteTopicId: VoteTopic.Mp,
      userReference: userRef._id,
    })
    if (voteMp !== null) {
      return res.status(401).json(errorResponse('You already voted this topic'))
    }
  } else if (req.body.voteTopicId === VoteTopic.Party) {
    const voteParty = await mongoClientVote.findOne<VoteResult>({
      voteTopicId: VoteTopic.Party,
      userReference: userRef._id,
    })
    if (voteParty !== null) {
      return res.status(401).json(errorResponse('You already voted this topic'))
    }
  } else return res.status(401).json(errorResponse('Vote topic unavailable'))
  const voteResult: VoteResult = {
    timestamp: new Date(),
    userReference: userRef._id,
    voteTopicId: req.body.voteTopicId,
    ballotId: req.body.ballotId
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
        userReference: userRef._id,
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
        userReference: userRef._id,
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

export const userCandidateHandler = async (req: Request, res: Response) => {
  const areaId = res.locals.user.DistricID
  if (areaId === undefined) {
    return res.status(401).json('You are not logged in')
  }
  try {
    const response = await GetAllMpCandidatesInArea(areaId)
    return res.status(200).json(response.data)
  } catch (e: any) {
    logger.error(e.message)
    return res.status(500).json(errorResponse('Connection to EC error'))
  }
}
