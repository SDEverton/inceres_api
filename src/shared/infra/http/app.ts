import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import '../../container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import upload from '@config/upload';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { AppError } from '@shared/errors/AppError';
import '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', '..', '..', '..', 'logs', 'access.log'),
  {
    flags: 'a',
  }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/file', express.static(`${upload.tmpFolder}/file`));

app.use(cors());
app.use('/v1', router);

app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: {
          message: err.message,
          code: err.code,
        },
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
