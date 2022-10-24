import dotenv from "dotenv";
import http from "http";
import { appConfig } from "@src/utils/config";
import app from "@src/app";
import logger from "@src/utils/logger";
import swaggerDocs from "./utils/swagger";
import connectDB from './utils/connectDB';
dotenv.config();

const server: http.Server = http.createServer(app);
const PORT: number = appConfig.port;

swaggerDocs(app, PORT);

server.listen(PORT, () => {
	logger.info(`Server listening on port ${PORT}.`);
	connectDB();
});
