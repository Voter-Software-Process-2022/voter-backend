import { moduleHosts } from '../utils/config'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const GOVERNMENT_HOST = moduleHosts.government

export interface UserInformationApiResponse {
  CitizenID: string
  LazerID: string
  Name: string
  Lastname: string
  Birthday: Date
  Nationality: string
  DistricID: number
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

export interface MessageResponse {
  message: string
}

export interface JwtToken {
  CitizenID: string
  exp: Date
  iat: Date
}

export const GetUserInformationApiAsync = async (
  token: string,
): Promise<AxiosResponse<UserInformationApiResponse | MessageResponse>> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get<UserInformationApiResponse | MessageResponse>(
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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
