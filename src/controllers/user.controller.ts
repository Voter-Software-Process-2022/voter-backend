import { errorResponse } from '../schemas/resposne.schema'
import { Request, Response } from 'express'
import { findAllUsers } from '../services/user.service'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { moduleHosts } from '../utils/config'
import { PubSubUnsubscribeCommands } from '@redis/client/dist/lib/client/commands-queue'

const GOVERNMENT_HOST = moduleHosts.government

export const getMeHandler = (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    return res.status(200).json({
      status: 'success',
      user,
    })
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}

export const getMeHandlerV2 = (req: Request, res: Response) => {
  try {
    // wait for frontend
    const cookies: any = {}
    const cookiesArray: string[] = req.cookies.split(';')
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.trim().split('=')
      cookies[key] = value
    })
    const token: string = cookies.token
    if (!token) {
      return res.status(500).json(errorResponse('Not logged in yet'))
    }
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const user = axios.get(`${GOVERNMENT_HOST}/user/info`, config)
    return res.status(200).json({
      status: 'success',
      user,
    })
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers()
    return res.status(200).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    })
  } catch (err: any) {
    return res.status(500).json(errorResponse(err.message))
  }
}
