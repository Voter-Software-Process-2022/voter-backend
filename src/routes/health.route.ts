import express from "express";
import { healthCheckHandler } from "@src/controllers/health.controller";

const router = express.Router();

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get("/", healthCheckHandler);

export { router as healthRouter };
