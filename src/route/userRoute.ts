import { Router } from "express";
import { auth } from "../middlewares/auth";
import UserController from "../controllers/UserController";

const router = Router();

const userController = new UserController();

router.get("/movie/favorite", auth(), userController.fetchFavoriteMovies);
router.get("/movie/:id/favorite", auth(), userController.favoriteMovie);

export default router;
