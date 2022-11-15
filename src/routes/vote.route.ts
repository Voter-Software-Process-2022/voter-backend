import {
  candidateHandler,
  candidatesHandler,
  topicsHandler,
  voteHandler,
} from '@src/controllers/vote.controller'
import { deserializeUser } from '@src/middleware/deserializeUser'
import { requireUser } from '@src/middleware/requireUser'
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
router.get('/candidates', candidatesHandler)
router.get('/candidate/:candidateId', candidateHandler)
router.get('/topics', topicsHandler)

export default router
