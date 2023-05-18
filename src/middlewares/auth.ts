import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import { IUser } from '../models/interfaces/IUser';
import { jwtVerifyManually } from '../config/passport';
import ApiError from '../helper/ApiError';

const verifyCallback =
     (req: Request, res: Response, resolve: any, reject: any) =>
     async (err: any, user: IUser, info: any) => {
          if (err || info || !user) {
               return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
          }

          req.userInfo = user;

          resolve();
     };

export const auth = () => async (req: Request, res: Response, next: NextFunction) => {
     new Promise((resolve, reject) => {
          passport.authenticate(
               'jwt',
               { session: false },
               verifyCallback(req, res, resolve, reject)
          )(req, res, next);
     })
          .then(() => next())
          .catch((err) => {
               next(err);
          });
};

export const authByManuallVerify =
     () => async (req: Request, res: Response, next: NextFunction) => {
          new Promise((resolve, reject) => {
               jwtVerifyManually(req, verifyCallback(req, res, resolve, reject));
          })
               .then(() => next())
               .catch((err) => {
                    next(err);
               });
     };
