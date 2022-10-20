import express, { Response } from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

app.get("/healthcheck", (_, res: Response) => {
    res.send("Voter Backend");
});

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
