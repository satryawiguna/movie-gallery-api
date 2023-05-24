import httpStatus from 'http-status';
import { Op } from 'sequelize';
import IMovieService from './contracts/IMovieService';
import MovieDao from '../dao/MovieDao';
import { logger } from '../config/logger';
import ResponseHandler from '../helper/ResponseHandler';
import { IMovieFilterRequest } from '../controllers/Requests/IMovieFilterRequest';
import { IMovie } from '../models/interfaces/IMovie';

export default class MovieService implements IMovieService {
     private movieDao: MovieDao;

     constructor() {
          this.movieDao = new MovieDao();
     }

     getMovies = async (movieFilterRequest: IMovieFilterRequest) => {
          try {
               let where: object = {};

               if (movieFilterRequest.search || movieFilterRequest.search !== undefined) {
                    where = {
                         ...where,
                         title: {
                              [Op.like]: `%${movieFilterRequest.search}%`,
                         },
                         description: {
                              [Op.like]: `%${movieFilterRequest.search}%`,
                         },
                    };
               }

               if (
                    ((movieFilterRequest.release_date_start ||
                         movieFilterRequest.release_date_start !== undefined) &&
                         movieFilterRequest.release_date_end) ||
                    movieFilterRequest.release_date_end !== undefined
               ) {
                    where = {
                         ...where,
                         release: {
                              $between: [
                                   movieFilterRequest.release_date_start,
                                   movieFilterRequest.release_date_end,
                              ],
                         },
                    };
               }

               let order;

               if (movieFilterRequest.order_column && movieFilterRequest.order_sort) {
                    order = [[movieFilterRequest.order_column, movieFilterRequest.order_sort]];
               }

               const moviesData = await this.movieDao.getDataTableData(
                    where,
                    movieFilterRequest.limit,
                    movieFilterRequest.offset,
                    order
               );

               return ResponseHandler.getPaginationData(
                    moviesData,
                    movieFilterRequest.page,
                    movieFilterRequest.limit
               );
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
          }
     };

     getMovieById = async (id: number) => {
          try {
               const movie = await this.movieDao.findOneByWhere({
                    id,
               });

               return ResponseHandler.returnSuccess(httpStatus.OK, '', movie);
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
          }
     };

     createMovie = async (createMovieRequest: IMovie) => {
          try {
               let message = 'Successfully Created movie.';

               let movieData = await this.movieDao.create(createMovieRequest);

               if (!movieData) {
                    message = 'Creating Failed! Please Try again.';

                    return ResponseHandler.returnError(httpStatus.BAD_REQUEST, message);
               }

               movieData = movieData.toJSON();

               return ResponseHandler.returnSuccess(httpStatus.CREATED, message, movieData);
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
          }
     };

     updateMovie = async (updateMovieRequest: IMovie, id: number) => {
          try {
               let message = 'Successfully Updated movie.';

               const movieData = await this.movieDao.findById(id);

               if (!movieData) {
                    message = 'Movie not found!';

                    return ResponseHandler.returnError(httpStatus.BAD_REQUEST, message);
               }

               if (updateMovieRequest.id !== id) {
                    message = 'Invalid request.';

                    return ResponseHandler.returnError(httpStatus.BAD_REQUEST, message);
               }

               const updateMovie = await this.movieDao.updateWhere(
                    {
                         title: updateMovieRequest.title,
                         description: updateMovieRequest.description,
                         release_date: updateMovieRequest.release_date,
                         runtime: updateMovieRequest.runtime,
                         revenue: updateMovieRequest.revenue,
                         poster: updateMovieRequest.poster,
                    },
                    { id }
               );

               if (updateMovie) {
                    return ResponseHandler.returnSuccess(
                         httpStatus.OK,
                         'Movie updated Successfully!',
                         await this.movieDao.findById(updateMovie)
                    );
               }

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Movie Update Failed!');
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
          }
     };

     deleteMovie = async (id: number) => {
          try {
               const movie = await this.movieDao.findById(id);

               if (!movie) {
                    return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Movie Not found!');
               }

               await this.movieDao.deleteByWhere({
                    id,
               });

               return ResponseHandler.returnSuccess(httpStatus.OK, 'Movie deleted Successfully!');
          } catch (e) {
               logger.error(e);

               return ResponseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
          }
     };
}
