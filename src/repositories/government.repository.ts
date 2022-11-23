import { moduleHosts } from '../utils/config'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import {
  ConnectionBetweenModuleError,
  TokenExpiredError,
} from '../utils/appError'

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
): Promise<UserInformationApiResponse> => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${GOVERNMENT_HOST}/user/info`, config)
    return response.data
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status.toString().startsWith('4'))
        throw new Error(err.response.data)
    }
    throw new ConnectionBetweenModuleError('Government')
  }
}

export const ApplyVoteApiAsync = async (
  token: string,
): Promise<ApplyVoteApiResponseEnum> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(`${GOVERNMENT_HOST}/vote/apply`, config)
    return response.status
  } catch {
    throw new ConnectionBetweenModuleError('Government')
  }
}

export const ValidateUserApiAsync = async (
  token: string,
): Promise<ApplyVoteApiResponseEnum> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${GOVERNMENT_HOST}/validity`, config)
    return response.status
  } catch {
    throw new ConnectionBetweenModuleError('Government')
  }
}

export const AuthenticationApiAsync = async (
  citizenId: string,
  laserId: string,
): Promise<AuthenticationApiResponse> => {
  const body = {
    CitizenID: citizenId,
    LazerID: laserId,
  }
  try {
    const response = await axios.post(`${GOVERNMENT_HOST}/auth/login`, body)
    return response.data
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.response?.status.toString().startsWith('4'))
        throw new Error(err.response.data)
    }
    throw new ConnectionBetweenModuleError('Government')
  }
}
