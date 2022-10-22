import express, { Express } from "express";
import { healthRouter } from "./routes/health.route";

const app: Express = express();

app.use(express.json());
app.use("/health", healthRouter);

export default app;
