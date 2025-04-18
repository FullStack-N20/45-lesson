import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { userController } from '../controllers/index.js';

const router = express.Router();

router.get('/users', authMiddleware, userController.getAllUsersController);
router.get('/users/:id', authMiddleware, userController.getUserByIdController);
router.post('/users', authMiddleware, userController.createUserController);
router.put('/users/:id', authMiddleware, userController.updateUserController);
router.delete('/users/:id', authMiddleware, userController.deleteUserController);

export default router;