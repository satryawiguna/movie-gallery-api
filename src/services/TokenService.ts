import { addDays, addMinutes, getUnixTime } from "date-fns";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import { tokenTypes } from "../config/tokens";
import { config } from "../config/config";
import { IUser } from "../models/interfaces/IUser";
import { parseTime } from "../helper/TimeHelper";
import { IToken } from "../models/interfaces/IToken";
import TokenDao from "../dao/TokenDao";
import ITokenService from "./contracts/ITokenService";
import RedisService from "./RedisService";

export default class TokenService implements ITokenService {
  private tokenDao: TokenDao;

  private redisService: RedisService;

  constructor() {
    this.tokenDao = new TokenDao();
    this.redisService = new RedisService();
  }

  generateToken = (id: number, expires: Date, type: string, secret = config.jwt.secret) => {
    const payload = {
      sub: id,
      iat: getUnixTime(new Date()),
      exp: getUnixTime(parseTime(expires)),
      type
    };

    return jwt.sign(payload, secret);
  };

  verifyToken = async (token: string, type: string) => {
    const payload: any = await jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new Error("Token not found");
      } else {
        return decoded;
      }
    });

    const tokenDoc: IToken = await this.tokenDao.findOne({
      token,
      type,
      user_id: payload.sub,
      blacklisted: false
    });

    if (!tokenDoc) {
      throw new Error("Token not found");
    }

    return tokenDoc;
  };

  saveToken = async (
    token: string,
    userId: number,
    expires: Date,
    type: string,
    blacklisted = false
  ) =>
    this.tokenDao.create({
      token,
      user_id: userId,
      expires,
      type,
      blacklisted
    });

  saveMultipleTokens = async (tokens: object[]) => this.tokenDao.bulkCreate(tokens);

  removeTokenById = async (id: number) => this.tokenDao.remove({ id });

  generateAuthTokens = async (user: IUser) => {
    await this.tokenDao.remove({
      user_id: user.id
    });

    const accessTokenExpires: Date = addMinutes(
      new Date(),
      config.jwt.accessExpirationMinutes
    );
    const accessToken = await this.generateToken(
      <number>user.id,
      accessTokenExpires,
      tokenTypes.ACCESS
    );
    const refreshTokenExpires: Date = addDays(new Date(), config.jwt.refreshExpirationDays);
    const refreshToken = await this.generateToken(
      <number>user.id,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );

    const authTokens: IToken[] = [];

    authTokens.push(<IToken>{
      token: accessToken,
      user_id: user.id,
      expires: accessTokenExpires,
      type: tokenTypes.ACCESS,
      blacklisted: false
    });

    authTokens.push(<IToken>{
      token: refreshToken,
      user_id: user.id,
      expires: refreshTokenExpires,
      type: tokenTypes.REFRESH,
      blacklisted: false
    });

    await this.saveMultipleTokens(authTokens);

    const expiredAccessTokenWhere = {
      expires: {
        [Op.lt]: new Date()
      },
      type: tokenTypes.ACCESS
    };

    await this.tokenDao.remove(expiredAccessTokenWhere);

    const expiredRefreshTokenWhere = {
      expires: {
        [Op.lt]: new Date()
      },
      type: tokenTypes.REFRESH
    };

    await this.tokenDao.remove(expiredRefreshTokenWhere);

    const tokens = {
      access: {
        token: accessToken,
        expires: accessTokenExpires
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires
      }
    };

    await this.redisService.createTokens(<number>user.id, tokens);

    return tokens;
  };
}
