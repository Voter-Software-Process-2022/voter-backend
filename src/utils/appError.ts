export default class AppError extends Error {
  status: string
  isOperational: boolean

  constructor(public message: string, public statusCode: number = 500) {
    super(message)
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export class LoginError extends Error {
  status: string
  isOperational: boolean

  constructor() {
    super('Invalid citizen ID/Laser ID')
    this.status = '400'
    this.isOperational = true
  }
}

export class ConnectionBetweenModuleError extends Error {
  status: string
  isOperational: boolean

  constructor(moduleName: string) {
    super(`Connection between ${moduleName} module error`)
    this.status = '400'
    this.isOperational = true
  }
}

export class TokenExpired extends Error {
  status: string
  isOperational: boolean

  constructor() {
    super('Token expired')
    this.status = '401'
    this.isOperational = true
  }
}
