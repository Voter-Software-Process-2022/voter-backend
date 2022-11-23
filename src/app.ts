import { appConfig } from './utils/config'
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
} from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { healthRouter } from './routes/health.route'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import swaggerDocs from './utils/swagger'
import { serve, setup } from 'swagger-ui-express'
import voteRouter from './routes/vote.route'
import candidateRouter from './routes/candidate.route'
import logger from './utils/logger'

const app: Express = express()

const ORIGIN = appConfig.origin

const docs = swaggerDocs()

app.use(json({ limit: '10kb' }))
app.use(cookieParser())

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  }),
)

app.use((req, res, next) => {
  logger.info(`${req.method}: ${req.originalUrl}`)
  next()
})

app.use('/api/health', healthRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/vote', voteRouter)
app.use('/api/candidate', candidateRouter)

if (process.env.NODE_ENV === 'development') {
  app.use('/docs', serve, setup(docs))

  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(docs)
  })
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any
  err.statusCode = 404
  next(err)
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error'
  err.statusCode = err.statusCode || 500

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

export default app
