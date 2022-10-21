import express, { Application } from "express";
import { healthRouter } from "./routes/health.route";

const app: Application = express();

app.use(express.json());
app.use("/health", healthRouter);

export default app;
