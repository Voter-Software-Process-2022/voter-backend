import { moduleHosts } from '@src/utils/config'
import axios, { AxiosResponse } from 'axios'

const ELECTION_COMMITTEE_HOST = moduleHosts.electionCommittee

export interface CandidateResponse {
  id: number
  name: string
  pictureUrl: string
  areaId: number
  partyId: number
}

export interface PartyResponse {
  id: number
  name: string
  pictureUrl: string
}

export interface Ballot {
  id: number
  areaId: number
  partyId: number
  candidateId: number
}

export interface VoteResponse {
  voteForParty: Ballot
}

export const GetAllMpCandidates = async (): Promise<
  AxiosResponse<CandidateResponse[]>
> => {
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/candidates`,
  )
  return response
}

export const GetMpCandidateInfo = async (
  id: number,
): Promise<AxiosResponse<CandidateResponse>> => {
  const response = await axios.get<CandidateResponse>(
    `${ELECTION_COMMITTEE_HOST}/candidate/${id}`,
  )
  return response
}

export const GetAllParties = async (): Promise<
  AxiosResponse<PartyResponse>
> => {
  const response = await axios.get<PartyResponse>(
    `${ELECTION_COMMITTEE_HOST}/party`,
  )
  return response
}

export const GetAllPartyMembers = async (
  partyId: number,
): Promise<AxiosResponse<CandidateResponse[]>> => {
  const requestParams = {
    party_id: partyId,
  }
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/party/member`,
    { params: requestParams },
  )
  return response
}

export const sendVoteToEc = async (
  partyId: number,
  candidateId: number,
): Promise<AxiosResponse<VoteResponse>> => {
  const requestParams = {
    party_id: partyId,
    candidate_id: candidateId,
  }
  const response = await axios.get<VoteResponse>(
    `${ELECTION_COMMITTEE_HOST}/vote`,
    { params: requestParams },
  )
  return response
}
