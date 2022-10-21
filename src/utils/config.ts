import dotenv from "dotenv";
dotenv.config();

export interface IAppConfig {
    port: number;
}

export const appConfig: IAppConfig = {
    port: Number(process.env.PORT) || 8000
};
