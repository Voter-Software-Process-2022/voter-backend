import {
  candidatesHandler,
  candidateHandler,
} from '@src/controllers/candidate.controller'
import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * '/candidate/candidates/{voteTopicId}':
 *  get:
 *     tags:
 *     - Candidate
 *     summary: Get All Candidates
 *     description: Get all candidates separated by vote topic.
 *     parameters:
 *      - name: voteTopicId
 *        in: path
 *        description: Vote topic id (1=Party, 2=MP)
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid Topic
 */
router.get('/:voteTopicId', candidatesHandler)
router.get('/:voteTopicId/:candidateId', candidateHandler)

export default router
