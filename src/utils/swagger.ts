import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import logger from "./logger";

const options: swaggerJsdoc.Options = {
	definition: {
		info: {
			title: "Voter API Docs",
			version: "1.0.0",
		},
		components: {
			securitySchemas: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		securityDefinitions: {
			ApiAuthKey: {
				type: "apiKey",
				name: "Authorization",
				in: "header",
			},
		},
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
	// Swagger page
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	// Docs in JSON format
	app.get("/docs.json", (req: Request, res: Response) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});

	logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
