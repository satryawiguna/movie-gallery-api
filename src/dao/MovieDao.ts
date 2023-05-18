import models from '../models';
import IMovieDao from './contracts/IMovieDao';
import SuperDao from './SuperDao';

const Movie = models.movie;

export default class MovieDao extends SuperDao implements IMovieDao {
     constructor() {
          super(Movie);
     }
}
