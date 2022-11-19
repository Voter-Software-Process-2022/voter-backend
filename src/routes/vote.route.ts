import { voteHandler } from '../controllers/vote.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { Router } from 'express'

const router = Router()
router.use(deserializeUser, requireUser)

/**
 * @openapi
 * '/vote/submit':
 *  post:
 *     tags:
 *     - Vote
 *     summary: Process Vote
 *     description: Process vote to a candidate
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VoteRequest'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request. User already voted this topic
 *      401:
 *        description: Unauthorized. User not authenticated
 */
router.post('/submit', voteHandler)

export default router
