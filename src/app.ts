import { appConfig } from '@src/utils/config'
import express, { Express, json, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { healthRouter } from './routes/health.route'
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

const app: Express = express()

const ORIGIN: string =
  appConfig.origin

app.use(json({ limit: '10kb' }));
app.use(cookieParser());

app.use(
    cors({
      origin: ORIGIN,
      credentials: true,
    })
  );

app.use('/health', healthRouter)
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || 500;
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
});

export default app
