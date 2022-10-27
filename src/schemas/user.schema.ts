import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    citizenID: string({required_error: 'CitizenID is required'}).email(
        'Invalid citizenID'
      ).min(13, 'citizenID must be exactly 13 characters')
       .max(13, 'citizenID must be exactly 13 characters'),
    laserCode: string({required_error: 'LaserCode is required'}),
  })
});

export const loginUserSchema = object({
  body: object({
    citizenID: string({ required_error: 'Email is required' }).email(
      'Invalid citizenID or laserCode'
    ).min(13, 'citizenID must be exactly 13 characters')
     .max(13, 'citizenID must be exactly 13 characters'),
    laserCode: string({ required_error: 'LaserCode is required' }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
