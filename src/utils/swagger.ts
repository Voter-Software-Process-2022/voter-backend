import { Express, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'
import logger from './logger'

const options: swaggerJsdoc.Options = {
  definition: {
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
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    securityDefinitions: {
      ApiAuthKey: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number): void {
  // Swagger page
  app.use('/docs', serve, setup(swaggerSpec))

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  logger.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
