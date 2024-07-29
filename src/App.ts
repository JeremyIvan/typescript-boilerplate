import express, { Express, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import helmet from 'helmet';
// import * as sanitize from 'sanitize';
import { rateLimit } from 'express-rate-limit';

import samplesRouter from './routers/samplesRouter'

// const ConfigManager = require('./configs');

const startServer = async () => {
    // await ConfigManager.initialize();

    const app: Express = express();

    const port: number = 8080;

    // app.set('env', ConfigManager.get("NODE_ENV"));

    const limiter = rateLimit({
        windowMs: 30 * 60 * 1000, // 30 minute
        limit: 1000,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        message: {
            message: 'You\'ve sent out too many requests. Please try again in a while.'
        }
    });

    // Middlewares
    app.use(bodyParser.json());
    app.use(cors());
    app.use(logger('short'));
    app.use(helmet());
    // app.use(sanitize.middleware);
    app.use(limiter);

    app.use(samplesRouter);

    // Test API Call
    app.get('/api/test', (request: Request, response: Response) => {
        response.json({
            message: 'Backend Application working properly.'
        });
    });


    // Error Handling
    app.use((request: Request, response: Response, next: NextFunction) => {
        next(createError(404));
    });

    app.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
        console.log(error);

        if (!error.status) {
            const isProduction = app.get('env') === 'prod';
            return response.status(500).json({
                message: isProduction ? 'Internal Server Error' : error.message,
            });
        }

        if (error.status === 400) {
            return response.status(400).json({
                errors: error.message,
            });
        }

        return response.status(error.status).json({
            message: error.message,
        });
    });

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}

startServer().catch(console.error);