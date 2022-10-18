import express, { Response } from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const PORT = 8000;

app.get("/healthcheck", (_, res: Response) => {
    res.send("Voter Backend");
});

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
