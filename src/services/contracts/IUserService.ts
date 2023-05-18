import { Request } from "express";
import { ApiServiceResponse } from "../../@types/apiServiceResponse";
import { IUser } from "../../models/interfaces/IUser";
import { IRegisterRequest } from "../../controllers/Requests/IRegisterRequest";
import { IFavorite } from "../../models/interfaces/IFavorite";

export default interface IUserService {
  createUser: (registerRequest: IRegisterRequest) => Promise<ApiServiceResponse>;
  getUserById: (id: number) => Promise<IUser>;
  isEmailExists: (email: string) => Promise<ApiServiceResponse>;
  changePassword: (req: Request) => Promise<ApiServiceResponse>;
  getFavoriteMovies: (id: number) => Promise<ApiServiceResponse>;
  favoriteMovie: (favoriteRequest: IFavorite) => Promise<ApiServiceResponse>;
}
