import { object, string, TypeOf } from 'zod'

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        citizenID:
 *          type: string
 *        laserCode:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - citizenID
 *        - laserCode
 *        - email
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        citizenID:
 *          type: string
 *          default: 1111111111111
 *        laserCode:
 *          type: string
 *          default: AZ1111111111
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        user:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        accessToken:
 *          type: string
 *    LoginUserInputV2:
 *      type: object
 *      required:
 *        - citizenId
 *        - laserId
 *      properties:
 *        citizenId:
 *          type: string
 *          example: 1234567890123
 *        laserId:
 *          type: string
 *          example: JT9999999999
 *    LoginUserResponseV2:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */

export const createUserSchema = object({
  body: object({
    citizenID: string({ required_error: 'CitizenID is required' })
      .min(13, 'citizenID must be exactly 13 characters')
      .max(13, 'citizenID must be exactly 13 characters'),
    laserCode: string({ required_error: 'LaserCode is required' }),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email',
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirmation: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
})

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password',
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password',
    ),
  }),
})

export const loginUserSchemaV2 = object({
  body: object({
    citizenId: string({ required_error: 'Citizen ID is required' }).length(
      13,
      'Citizen ID must have 13 numbers',
    ),
    laserId: string({ required_error: 'Laser Code is required' }).length(
      12,
      "Laser Code must contains 2 letters and 10 numbers, and don't put - between",
    ),
  }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body']
export type LoginUserInputV2 = TypeOf<typeof loginUserSchemaV2>['body']
