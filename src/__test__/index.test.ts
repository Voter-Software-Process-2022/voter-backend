import request from "supertest";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;
const BASE_URL = `http://localhost:${PORT}`;

describe('Test /health', () => {
    it('health should be okay', async () => {
        const response = await request(BASE_URL).get("/healthcheck");
        expect(response.statusCode).toBe(200);
        expect(response.error).toBe(false);
        expect(response.text).toBe("Voter Backend");
    });
});
