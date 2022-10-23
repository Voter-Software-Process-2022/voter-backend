import dotenv from "dotenv";
import { number } from "yargs";
dotenv.config();

export interface IAppConfig {
	port: number;
}

export interface EnvironmentVariables {
	dbName: string,
    dbPass: string,
    accessTokenPrivateKey: string,
    accessTokenPublicKey: string,
}

export const appConfig: IAppConfig = {
	port: Number(process.env.PORT) ?? 8000,
};

export const customEnvironmentVariables = {
    dbName: 'MONGODB_USERNAME',
    dbPass: 'MONGODB_PASSWORD',
    accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
    accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
  };
