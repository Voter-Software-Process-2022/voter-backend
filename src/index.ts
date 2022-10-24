import dotenv from "dotenv";
import http from "http";
import { appConfig, customEnvironmentVariables } from "@src/utils/config";
import app from "@src/app";
import logger from "@src/utils/logger";
import swaggerDocs from "./utils/swagger";
import mongoose from "mongoose";
dotenv.config();

const server: http.Server = http.createServer(app);
const PORT: number = appConfig.port;
const dbName: String = customEnvironmentVariables.dbName;
const dbPass: String = customEnvironmentVariables.dbPass;

swaggerDocs(app, PORT);

const uri = `mongodb+srv://${dbName}:${dbPass}@voter-software-process.l03pvct.mongodb.net/?retryWrites=true&w=majority`

async function connectDB() {
	try {
		await mongoose.connect(uri)
		logger.info('Connected to MongoDB')
	} catch (error) {
		logger.error(error);
		setTimeout(connectDB, 5000);
	}
}

connectDB();

server.listen(PORT, () => {
	logger.info(`Server listening on port ${PORT}.`);
});
