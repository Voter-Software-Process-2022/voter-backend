import express, { Express, json } from 'express'
import { healthRouter } from './routes/health.route'

const app: Express = express()

app.use(json())
app.use('/health', healthRouter)

export default app
