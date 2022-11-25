import { number, object, string, TypeOf } from 'zod'

// TODO: Implement these verification
const verifyTopicId = async (topicId: number) => true
const verifyCandidateId = async (candidateId: number) => true

/**
 * @openapi
 * components:
 *  schemas:
 *    VoteRequest:
 *      type: object
 *      required:
 *        - ballotId
 *        - voteTopicId
 *        - candidateId
 *        - areaId
 *      properties:
 *        ballotId:
 *          type: string
 *        voteTopicId:
 *          type: number
 *        candidateId:
 *          type: number
 *        areaId:
 *          type: number
 *    VoteNoRequest:
 *      type: object
 *      required:
 *        - ballotId
 *        - voteTopicId
 *      properties:
 *        ballotId:
 *          type: string
 *        voteTopicId:
 *          type: number
 *    VoteAvailableResponse:
 *      type: object
 *      properties:
 *        voteTopicId:
 *          type: number
 *        voteTopicName:
 *          type: string
 *    CandidateResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *        name:
 *          type: string
 *        pictureUrl:
 *          type: string
 *        area_id:
 *          type: number
 *          required: false
 *        party_id:
 *          type: number
 *          required: false
 */
export const createVoteSchema = object({
  body: object({
    ballotId: string({ required_error: 'ballotId is required' }),
    voteTopicId: number({ required_error: 'voteTopicId is required' }),
    candidateId: number({ required_error: 'candidateId is required' }),
    areaId: number(),
  }).refine(
    async (data) =>
      (await verifyTopicId(data.voteTopicId)) &&
      (await verifyCandidateId(data.candidateId)),
    {
      message: 'Topic or Candidate Not Found',
    },
  ),
})

export const createVoteNoSchema = object({
  body: object({
    ballotId: string({ required_error: 'ballotId is required' }),
    voteTopicId: number({ required_error: 'voteTopicId is required' }),
  }).refine(async (data) => await verifyTopicId(data.voteTopicId), {
    message: 'Topic Not Found',
  }),
})

export interface VoteAvailableResponse {
  voteTopicId: number
  voteTopicName: string
}

export type CreateVoteRequest = TypeOf<typeof createVoteSchema>['body']
export type CreateVoteNoRequest = TypeOf<typeof createVoteNoSchema>['body']
