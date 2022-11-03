import { Router } from 'express'
import { healthCheckHandler } from '../controllers/health.controller'

const router = Router()

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageResponse'
 */
router.get('/', healthCheckHandler)

export { router as healthRouter }
