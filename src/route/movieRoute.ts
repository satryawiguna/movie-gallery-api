import { Router } from 'express';
import { auth } from '../middlewares/auth';
import MovieController from '../controllers/MovieController';
import MovieValidator from '../validators/MovieValidator';

const router = Router();

const movieController = new MovieController();

const movieValidator = new MovieValidator();

router.post('/fetchAll', auth(), movieValidator.movieFilterValidator, movieController.fetchMovies);
router.get('/:id', auth(), movieController.showMovie);
router.post('/create', auth(), movieValidator.movieCreateValidator, movieController.createMovie);
router.put('/:id/update', auth(), movieValidator.movieUpdateValidator, movieController.updateMovie);
router.delete('/:id', auth(), movieController.deleteMovie);

export default router;
