import * as redisClient from '../config/redisClient';
import IRedisService from './contracts/IRedisService';
import RedisHelper from '../helper/RedisHelper';
import { config } from '../config/config';
import { IUser } from '../models/interfaces/IUser';

export default class RedisService implements IRedisService {
     private redisHelper: RedisHelper;

     constructor() {
          this.redisHelper = new RedisHelper(redisClient);
     }

     createTokens = async (
          id: number,
          tokens: { access: { token: string }; refresh: { token: string } }
     ) => {
          const accessKey = `access_token:${tokens.access.token}`;
          const refreshKey = `refresh_token:${tokens.refresh.token}`;
          const accessKeyExpires = config.jwt.accessExpirationMinutes * 60;
          const refreshKeyExpires = config.jwt.refreshExpirationDays * 24 * 60 * 60;

          await this.redisHelper.setEx(accessKey, accessKeyExpires, id.toString());
          await this.redisHelper.setEx(refreshKey, refreshKeyExpires, id.toString());

          return true;
     };

     hasToken = async (token: string, type = 'access_token') => {
          const hasToken = await this.redisHelper.get(`${type}:${token}`);

          if (hasToken != null) {
               return true;
          }

          return false;
     };

     removeToken = async (token: string, type = 'access_token') =>
          this.redisHelper.del(`${type}:${token}`);

     getUser = async (id: number) => {
          const user = await this.redisHelper.get(`user:${id.toString()}`);

          if (user != null) {
               return JSON.parse(user);
          }

          return false;
     };

     setUser = async (user: IUser) => {
          const setUser = await this.redisHelper.set(`user:${user.id}`, JSON.stringify(user));

          if (!setUser) {
               return true;
          }

          return false;
     };
}
