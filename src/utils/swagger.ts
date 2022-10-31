import swaggerJsdoc from 'swagger-jsdoc'
import { appConfig } from './config'
import logger from './logger'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Voter API Docs',
      version: '1.0.0',
      description:
        'This is REST API Application from Voter module, Software Process and Project Management 2022.',
      contact: {
        name: 'Discord channel',
        url: 'https://discord.gg/5mFwh8EH',
      },
      license: {
        name: 'MIT License',
        url: 'https://www.mit.edu/~amini/LICENSE.md',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: `http://localhost:${appConfig.port}/api`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs() {
  logger.info(`Docs available at http://localhost:${appConfig.port}/docs`)
  return swaggerSpec
}

export default swaggerDocs
