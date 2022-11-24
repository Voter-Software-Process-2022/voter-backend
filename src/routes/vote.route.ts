import {
  userCandidateHandler,
  verifyRightToVoteHandler,
  voteHandler,
} from '../controllers/vote.controller'
import { deserializeUserV2 } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { Router } from 'express'

const router = Router()
router.use(deserializeUserV2, requireUser)

/**
 * @openapi
 * '/vote/mpcandidate':
 *  post:
 *    tags:
 *    - Vote
 *    summary: Get MP candidate in user area
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CandidateResponse'
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
 * '/vote/pre-verify':
 *  post:
 *     tags:
 *     - Vote
 *     summary: Verify right to vote
 *     description: Verify right to vote before can access to vote
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Has right
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/VoteAvailableResponse'
 *      400:
 *        description: Bad Request.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *      401:
 *        description: Unauthorized. User not authenticated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/submit', voteHandler)
router.post('/pre-verify', verifyRightToVoteHandler)
router.post('/mpcandidate', userCandidateHandler)

export default router
