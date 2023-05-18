import cors from 'cors';
import passport from 'passport';
import express, { Express, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from './helper/ApiError';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './route';
import { jwtStrategy } from './config/passport';

process.env.PWD = process.cwd();

export const app: Express = express();

app.use(
     cors({
          origin: '*',
     })
);

app.use(express.static(`${process.env.PWD}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

passport.use('jwt', jwtStrategy);
app.use(passport.initialize());

app.get('/api/v1/test', async (req, res) => {
     res.status(200).send('Congratulations! API is working!');
});

app.use('/api/v1', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
     next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

// db.sequelize.sync();
