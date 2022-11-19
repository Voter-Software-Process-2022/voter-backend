import { number, object, TypeOf } from 'zod'

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
 *        - voteTopicId
 *        - candidateId
 *      properties:
 *        voteTopicId:
 *          type: number
 *        candidateId:
 *          type: number
 */
export const createVoteSchema = object({
  body: object({
    voteTopicId: number({ required_error: 'voteTopicId is required' }),
    candidateId: number({ required_error: 'candidateId is required' }),
  }).refine(
    async (data) =>
      (await verifyTopicId(data.voteTopicId)) &&
      (await verifyCandidateId(data.candidateId)),
    {
      message: 'Topic or Candidate Not Found',
    },
  ),
})

export type CreateVoteRequest = TypeOf<typeof createVoteSchema>['body']
