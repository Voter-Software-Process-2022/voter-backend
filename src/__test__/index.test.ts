import request from "supertest";

const BASE_URL = "http://localhost:8000";

describe('Test /health', () => {
    it('health should be okay', async () => {
        const response = await request(BASE_URL).get("/healthcheck");
        expect(response.statusCode).toBe(200);
        expect(response.error).toBe(false);
        expect(response.text).toBe("Voter Backend");
    });
});
