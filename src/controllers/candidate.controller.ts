import { mpCandidates } from '@src/mocks/candidateMp'
import { partyCandidates } from '@src/mocks/candidateParty'
import { VoteTopic } from '@src/models/vote.model'
import {
  GetAllMpCandidates,
  GetAllParties,
  GetAllPartyMembers,
  GetMpCandidateInfo,
} from '@src/repositories/electioncommittee.repository'
import { appConfig } from '@src/utils/config'
import { Request, Response } from 'express'

export const candidatesHandler = async (req: Request, res: Response) => {
  if (appConfig.useMock) {
    console.log(req.params.voteTopicId)
    if (req.params.voteTopicId === VoteTopic.Mp.valueOf().toString()) {
      return res.status(200).json(mpCandidates)
    } else if (
      req.params.voteTopicId === VoteTopic.Party.valueOf().toString()
    ) {
      return res.status(200).json(partyCandidates)
    } else {
      return res.status(400).json(null)
    }
  }

  if (req.params.voteTopicId === VoteTopic.Mp.valueOf().toString()) {
    const response = await GetAllMpCandidates()
    return res.status(response.status).json(response.data)
  } else if (req.params.voteTopicId === VoteTopic.Party.valueOf().toString()) {
    const response = await GetAllParties()
    return res.status(response.status).json(response.data)
  } else {
    return res.status(400).json(null)
  }
}

export const candidateHandler = async (req: Request, res: Response) => {
  if (appConfig.useMock) {
    console.log(req.params.voteTopicId)
    if (req.params.voteTopicId === VoteTopic.Mp.valueOf().toString()) {
      return res.status(200).json(mpCandidates[0])
    } else if (
      req.params.voteTopicId === VoteTopic.Party.valueOf().toString()
    ) {
      return res.status(200).json(partyCandidates[0])
    } else {
      return res.status(400).json(null)
    }
  }

  if (req.params.voteTopicId === VoteTopic.Mp.valueOf().toString()) {
    const response = await GetMpCandidateInfo(Number(req.params.candidateId))
    return res.status(response.status).json(response.data)
  } else if (req.params.voteTopicId === VoteTopic.Party.valueOf().toString()) {
    const response = await GetAllPartyMembers(Number(req.params.candidateId))
    return res.status(response.status).json(response.data)
  } else {
    return res.status(400).json(null)
  }
}
