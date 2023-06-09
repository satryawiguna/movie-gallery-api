import httpStatus from 'http-status';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import IAuthService from './contracts/IAuthService';
import UserDao from '../dao/UserDao';
import TokenDao from '../dao/TokenDao';
import RedisService from './RedisService';
import ResponseHandler from '../helper/ResponseHandler';
import { logger } from '../config/logger';
import { tokenTypes } from '../config/tokens';

export default class AuthService implements IAuthService {
     private userDao: UserDao;

     private tokenDao: TokenDao;

     private redisService: RedisService;

     constructor() {
          this.userDao = new UserDao();
          this.tokenDao = new TokenDao();
          this.redisService = new RedisService();
     }

     loginWithEmailPassword = async (email: string, password: string) => {
          try {
               let user = await this.userDao.findByEmail(email);

               if (user == null) {
                    return ResponseHandler.returnError(
                         httpStatus.BAD_REQUEST,
                         'Invalid Email Address!'
                    );
               }

               const isPasswordValid = await bcrypt.compare(password, user.password);

               user = user.toJSON();

               delete user.password;

               if (!isPasswordValid) {
                    return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Wrong Password!');
               }

               return ResponseHandler.returnSuccess(httpStatus.OK, 'Login Succeed', user);
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
          }
     };

     logout = async (req: Request, res: Response) => {
          const refreshTokenDoc = await this.tokenDao.findOne({
               token: req.body.refresh_token,
               type: tokenTypes.REFRESH,
               blacklisted: false,
          });

          if (!refreshTokenDoc) {
               return false;
          }

          await this.tokenDao.remove({
               token: req.body.refresh_token,
               type: tokenTypes.REFRESH,
               blacklisted: false,
          });

          await this.tokenDao.remove({
               token: req.body.access_token,
               type: tokenTypes.ACCESS,
               blacklisted: false,
          });

          await this.redisService.removeToken(req.body.access_token, 'access_token');
          await this.redisService.removeToken(req.body.refresh_token, 'refresh_token');

          return true;
     };
}
