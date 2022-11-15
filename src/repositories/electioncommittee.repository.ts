import axios, { AxiosResponse } from 'axios'

// TODO: Define Election Committee host url
const ELECTION_COMMITTEE_HOST = ''

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

export const GetAllMpCandidates = async (): Promise<
  AxiosResponse<CandidateResponse[], any>
> => {
  const response = await axios.get<CandidateResponse[]>(
    `${ELECTION_COMMITTEE_HOST}/candidates`,
  )
  return response
}
