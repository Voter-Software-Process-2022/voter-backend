import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    citizenID: string({required_error: 'CitizenID is required'}).email(
        'Invalid citizenID'
      ).min(13, 'citizenID must be exactly 13 characters')
       .max(13, 'citizenID must be exactly 13 characters'),
    laserCode: string({required_error: 'LaserCode is required'}),
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email'
    ),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email(
      'Invalid email or password'
    ),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid email or password'
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
