import { moduleHosts } from '../utils/config'
import axios, { AxiosResponse } from 'axios'
import { VoteTopic } from '../models/vote.model'

const ELECTION_COMMITTEE_HOST = moduleHosts.electionCommittee

export interface CandidateResponse {
  id: number
  name: string
  pictureUrl: string
  area_id: number
  party_id: number
}

export interface PartyResponse {
  id: number
  name: string
  pictureUrl: string
}

export interface Ballot {
  id: number
  areaId: number
}

export interface MpBallot extends Ballot {
  candidateId: number
}

export interface PartyBallot extends Ballot {
  partyId: number
}

export interface VoteResponse {
  voteResult: MpBallot | PartyBallot
}

export const GetAllMpCandidates = async (): Promise<
  AxiosResponse<CandidateResponse[]>
> => {
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/candidates`,
  )
  return response
}

export const GetAllMpCandidatesInArea = async (areaId: number) => {
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/candidates/area/${areaId}`,
  )
  return response
}

export const GetMpCandidateInfo = async (
  id: number,
): Promise<AxiosResponse<CandidateResponse>> => {
  const response = await axios.get<CandidateResponse>(
    `${ELECTION_COMMITTEE_HOST}/candidates/${id}`,
  )
  return response
}

export const GetAllParties = async (): Promise<
  AxiosResponse<PartyResponse[]>
> => {
  const response = await axios.get<PartyResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/party`,
  )
  return response
}

export const GetPartyInformation = async (
  partyId: number,
): Promise<AxiosResponse<PartyResponse>> => {
  const response = await axios.get<PartyResponse>(
    `${ELECTION_COMMITTEE_HOST}/party/${partyId}`,
  )
  return response
}

export const GetAllPartyMembers = async (
  partyId: number,
): Promise<AxiosResponse<CandidateResponse[]>> => {
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/party/member/${partyId}`,
  )
  return response
}

export const sendVoteToEc = async (
  voteTopicId: VoteTopic,
  candidateId: number,
  areaId: number,
): Promise<AxiosResponse<VoteResponse>> => {
  const requestParams = {
    vote_topic_id: voteTopicId,
    area_id: areaId,
    vote_target_id: candidateId,
  }
  const response = await axios.get<VoteResponse>(
    `${ELECTION_COMMITTEE_HOST}/vote`,
    { params: requestParams },
  )
  return response
}
