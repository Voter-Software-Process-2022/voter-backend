import express from "express";
import { healthCheckHandler } from "@src/controllers/health.controller";

const router = express.Router();

router.get("/", healthCheckHandler);

export { router as healthRouter };
