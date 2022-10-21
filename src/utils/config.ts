import dotenv from "dotenv";
dotenv.config();

export interface IAppConfig {
    port: string | number;
}

export const appConfig: IAppConfig = {
    port: process.env.PORT || 8000
};
