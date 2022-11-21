import {
  verifyRightToVoteHandler,
  voteHandler,
} from '../controllers/vote.controller'
import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * '/vote/submit':
 *  post:
 *     tags:
 *     - Vote
 *     summary: Process Vote
 *     description: Process vote to a candidate
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
 * '/vote/pre-verify':
 *  post:
 *     tags:
 *     - Vote
 *     summary: Verify right to vote
 *     description: Verify right to vote before can access to vote
 *     responses:
 *      200:
 *        description: Vote Success
 *      400:
 *        description: Bad Request.
 *      401:
 *        description: Unauthorized. User not authenticated
 */
router.post('/submit', voteHandler)
router.post('/pre-verify', verifyRightToVoteHandler)

export default router
