import request from "supertest";
import app from "../../app";

describe("Test /health", () => {
	it("health should be okay", async () => {
		const response = await request(app).get("/health");
		expect(response.statusCode).toBe(200);
		expect(response.error).toBe(false);
		expect(response.text).toBe("Voter Backend");
	});
});
