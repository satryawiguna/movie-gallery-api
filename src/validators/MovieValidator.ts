import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';
import ApiError from '../helper/ApiError';

export default class MovieValidator {
     async movieFilterValidator(req: Request, res: Response, next: NextFunction) {
          const schema = Joi.object({
               search: Joi.string().optional(),
               order_field: Joi.string().optional(),
               order_sort: Joi.string().optional(),
               limit: Joi.number(),
               offset: Joi.number(),
               page: Joi.number(),
               release_date_end: Joi.date().iso().optional(),
               release_date_start: Joi.when('release_date_end', {
                    is: Joi.date(),
                    then: Joi.date().iso().min(Joi.ref('release_date_end')).optional(),
                    otherwise: Joi.date().iso().optional(),
               }),
          });

          const options = {
               abortEarly: false,
               allowUnknown: true,
               stripUnknown: true,
          };

          const { error, value } = schema.validate(req.body, options);

          if (error) {
               const errorMessage = error.details.map((details) => details.message).join(', ');
               next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
          } else {
               req.body = value;

               return next();
          }
     }

     async movieCreateValidator(req: Request, res: Response, next: NextFunction) {
          const schema = Joi.object({
               title: Joi.string(),
               description: Joi.string(),
               release_date: Joi.date().iso(),
               runtime: Joi.string(),
               revenue: Joi.number(),
               poster: Joi.string().uri(),
          });

          const options = {
               abortEarly: false,
               allowUnknown: true,
               stripUnknown: true,
          };

          const { error, value } = schema.validate(req.body, options);

          if (error) {
               const errorMessage = error.details.map((details) => details.message).join(', ');
               next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
          } else {
               req.body = value;

               return next();
          }
     }

     async movieUpdateValidator(req: Request, res: Response, next: NextFunction) {
          const schema = Joi.object({
               id: Joi.number(),
               title: Joi.string(),
               description: Joi.string(),
               release_date: Joi.date().iso(),
               runtime: Joi.string(),
               revenue: Joi.number(),
               poster: Joi.string().uri(),
          });

          const options = {
               abortEarly: false,
               allowUnknown: true,
               stripUnknown: true,
          };

          const { error, value } = schema.validate(req.body, options);

          if (error) {
               const errorMessage = error.details.map((details) => details.message).join(', ');
               next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
          } else {
               req.body = value;

               return next();
          }
     }
}
