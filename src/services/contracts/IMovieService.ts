import { ApiServiceResponse, DataTableResponse } from "../../@types/apiServiceResponse";
import { IMovieFilterRequest } from "../../controllers/Requests/IMovieFilterRequest";
import { IMovie } from "../../models/interfaces/IMovie";
import { IUser } from "../../models/interfaces/IUser";

export default interface IMovieService {
  getMovies: (
    movieFilterRequest: IMovieFilterRequest
  ) => Promise<ApiServiceResponse | DataTableResponse>;
  getMovieById: (id: number) => Promise<ApiServiceResponse>;
  createMovie: (createMovieRequest: IMovie) => Promise<ApiServiceResponse>;
  updateMovie: (updateMovieRequest: IMovie, id: number) => Promise<ApiServiceResponse>;
  deleteMovie: (id: number) => Promise<ApiServiceResponse>;
}
