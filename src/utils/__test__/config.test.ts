import { appConfig, IAppConfig } from "../config";
import dotenv from "dotenv";

dotenv.config();

const config: IAppConfig = {
	port: Number(process.env.PORT) ?? 8000,
};

describe("Test load config from .env", () => {
	it("should equal app config", async () => {
		expect(config.port).toBe(appConfig.port);
	});
});
