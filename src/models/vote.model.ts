import { ObjectId } from 'mongodb'
import {
  CandidateResponse,
  PartyResponse,
} from '../repositories/electioncommittee.repository'
import { DatabaseModel } from '../repositories/mongodb.repository'

export enum VoteTopic {
  Mp = 1,
  Party = 2,
}

export interface VoteResult extends DatabaseModel {
  timestamp: Date
  userReference: ObjectId
  voteTopicId: number
  CandidateId: number
  candidateInfo: CandidateResponse | PartyResponse
}
