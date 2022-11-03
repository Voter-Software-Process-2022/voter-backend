import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    ErrorResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        error:
 *          type: string
 *    MessageResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        message:
 *          type: string
 */

export const errorSchema = object({
  response: object({
    status: string(),
    error: string(),
  }),
})

export const messageSchema = object({
  response: object({
    status: string(),
    message: string(),
  }),
})

export const errorResponse = (errorMessage: string): ErrorResponse => {
  const response = {
    status: 'error',
    error: errorMessage,
  }
  return response
}

export const messageResponse = (message: string): MessageResponse => {
  const response = {
    status: 'success',
    message,
  }
  return response
}

export type ErrorResponse = TypeOf<typeof errorSchema>['response']
export type MessageResponse = TypeOf<typeof messageSchema>['response']
