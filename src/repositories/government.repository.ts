import { moduleHosts } from '../utils/config'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const GOVERNMENT_HOST = moduleHosts.government

export interface UserInformationApiResponse {
  CitizensID: string
  FirstName: string
  LastName: string
  DateOfBirth: Date
  Religion: string
  Location: string
  Nationality: string
}

export enum ApplyVoteApiResponseEnum {
  Success = 201,
  Unsuccess = 400,
  Unauthorized = 401,
  Unknown = 999,
}

export enum ValidateUserApiResponseEnum {
  hasRight = 200,
  hasNoRight = 400,
  Unauthorized = 401,
  Unknown = 999,
}

export interface AuthenticationApiResponse {
  token: string
}

export interface JwtToken {
  CitizenID: string
  exp: Date
  iat: Date
}

export const GetUserInformationApiAsync = async (
  token: string,
): Promise<AxiosResponse<UserInformationApiResponse>> => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.get<UserInformationApiResponse>(
    `${GOVERNMENT_HOST}/user/info`,
    config,
  )
  return response
}

export const ApplyVoteApiAsync = async (
  token: string,
): Promise<ApplyVoteApiResponseEnum> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(`${GOVERNMENT_HOST}/vote/apply`, config)
  return response.status
}

export const ValidateUserApiAsync = async (
  token: string,
): Promise<ApplyVoteApiResponseEnum> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.get(`${GOVERNMENT_HOST}/validity`, config)
  return response.status
}

export const AuthenticationApiAsync = async (
  citizenId: string,
  laserId: string,
): Promise<AxiosResponse<AuthenticationApiResponse>> => {
  const body = {
    CitizenID: citizenId,
    LazerID: laserId,
  }
  const response = await axios.post<AuthenticationApiResponse>(
    `${GOVERNMENT_HOST}/auth/login`,
    body,
  )
  return response
}
