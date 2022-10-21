import http from "http";
import { appConfig } from "@src/utils/config";
import app from "@src/app";

const server: http.Server = http.createServer(app);

server.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port}.`);
});
