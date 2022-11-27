import {
  candidatesHandler,
  candidateHandler,
  partyMemberHandler,
} from '../controllers/candidate.controller'
import { Router } from 'express'

const router = Router()

/**
 * @openapi
 * '/candidate/{voteTopicId}':
 *  get:
 *     tags:
 *     - Candidate
 *     summary: Get All Candidates
 *     description: Get all candidates separated by vote topic.
 *     parameters:
 *      - name: voteTopicId
 *        in: path
 *        description: Vote topic id (1=MP, 2=Party)
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CandidateResponse'
 *      400:
 *        description: Invalid Topic
 * '/candidate/{voteTopicId}/{candidateId}':
 *  get:
 *     tags:
 *     - Candidate
 *     summary: Get selected candidate
 *     description: Get selected candidate of selected topic.
 *     parameters:
 *      - name: voteTopicId
 *        in: path
 *        description: Vote topic id (1=MP, 2=Party)
 *        required: true
 *        schema:
 *          type: integer
 *      - name: candidateId
 *        in: path
 *        description: Candidate id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Invalid Topic or Candidate
 * '/candidate/partymember/{partyId}':
 *  get:
 *    tags:
 *    - Candidate
 *    summary: Get all party members
 *    parameters:
 *     - name: partyId
 *       in: path
 *       description: Party ID
 *       required: true
 *       schema:
 *         type: integer
 *    responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CandidateResponse'
 */
router.get('/partymember/:partyId', partyMemberHandler)
router.get('/:voteTopicId', candidatesHandler)
router.get('/:voteTopicId/:candidateId', candidateHandler)

export default router
