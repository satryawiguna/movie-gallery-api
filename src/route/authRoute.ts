import { Router } from 'express';
import { auth } from '../middlewares/auth';
import UserValidator from '../validators/UserValidator';
import AuthController from '../controllers/AuthController';

const router = Router();

const authController = new AuthController();

const userValidator = new UserValidator();

router.post('/register', userValidator.userCreateValidator, authController.register);
router.post('/email-exists', userValidator.checkEmailValidator, authController.checkEmail);
router.post('/login', userValidator.userLoginValidator, authController.login);
router.post('/refresh-token', authController.refreshTokens);
router.post('/logout', authController.logout);
router.put(
     '/change-password',
     auth(),
     userValidator.changePasswordValidator,
     authController.changePassword
);

export default router;
