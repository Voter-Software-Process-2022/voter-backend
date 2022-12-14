import { Router } from 'express'
import {
  loginHandler,
  loginHandlerV2,
  registerHandler,
} from '../controllers/auth.controller'
import { validate } from '../middleware/validate'
import {
  createUserSchema,
  loginUserSchema,
  loginUserSchemaV2,
} from '../schemas/user.schema'

const router = Router()

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Register
 *     description: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 * '/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     description: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 * '/auth/login/v2':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login with Gov
 *     description: Login with Government API
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInputV2'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponseV2'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', validate(createUserSchema), registerHandler)

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler)

// Login with Gov
router.post('/login/v2', validate(loginUserSchemaV2), loginHandlerV2)

export default router
