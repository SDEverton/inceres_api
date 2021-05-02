import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import '../../container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

// createConnection();
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(router);

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
