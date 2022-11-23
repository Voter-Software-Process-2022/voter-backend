import { Router } from 'express'
import { getMeHandler, getMeHandlerV2 } from '../controllers/user.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = Router()
router.use(deserializeUser, requireUser)

// Admin Get Users route
// Haven't decided to customize the admin role yet.
// router.get('/', restrictTo('admin'), getAllUsersHandler);

// Get my info route

/**
 * @openapi
 * '/users/me':
 *  get:
 *     tags:
 *     - User
 *     summary: Get user
 *     description: Get user information
 *     security:
 *       - bearerAuth: []
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
 */
router.get('/me', getMeHandler)
// router.get('/me', getMeHandlerV2)

export default router
