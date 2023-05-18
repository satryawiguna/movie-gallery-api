import { Router } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import movieRoute from './movieRoute';

const router = Router();

const defaultRoutes = [
     {
          path: '/auth',
          route: authRoute,
     },
     {
          path: '/user',
          route: userRoute,
     },
     {
          path: '/movie',
          route: movieRoute,
     },
];

defaultRoutes.forEach((route) => {
     router.use(route.path, route.route);
});

export default router;
