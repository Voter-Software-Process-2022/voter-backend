import {
  userCandidateHandler,
  verifyRightToVoteHandler,
  voteHandler,
  voteNoHandler,
} from '../controllers/vote.controller'
import { deserializeUserV2 } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { Router } from 'express'

const router = Router()
router.use(deserializeUserV2, requireUser)

/**
 * @openapi
 * '/vote/mpcandidate':
 *  get:
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
 * '/vote/no':
 *  post:
 *     tags:
 *     - Vote
 *     summary: Process Vote No
 *     description: Process vote No to topic
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/VoteNoRequest'
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request. User already voted this topic
 *      401:
 *        description: Unauthorized. User not authenticated
 * '/vote/pre-verify':
 *  get:
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
router.post('/no', voteNoHandler)
router.post('/submit', voteHandler)
router.get('/pre-verify', verifyRightToVoteHandler)
router.get('/mpcandidate', userCandidateHandler)

export default router
