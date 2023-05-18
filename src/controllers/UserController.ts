import { Request, Response } from "express";
import httpStatus from "http-status";
import UserService from "../services/UserService";
import { ApiServiceResponse, DataTableResponse } from "../@types/apiServiceResponse";
import { logger } from "../config/logger";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  fetchFavoriteMovies = async (req: Request, res: Response) => {
    try {
      const movies: ApiServiceResponse = await this.userService.getFavoriteMovies(
        Number(req.userInfo?.id)
      );

      res.send(movies);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  favoriteMovie = async (req: Request, res: Response) => {
    try {
      const responseData: ApiServiceResponse = await this.userService.favoriteMovie({
        user_id: Number(req.userInfo?.id),
        movie_id: Number(req.params.id)
      });

      res.status(responseData.statusCode).send(responseData.response);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
