import { Request, Response } from "express";

export function healthCheckHandler(req: Request, res: Response) {
    res.send("Voter Backend");
}
