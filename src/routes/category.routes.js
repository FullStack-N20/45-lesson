import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { categoryController } from '../controllers/index.js';

const router = express.Router();

router.get('/categories', categoryController.getAll);
router.get('/categories/:id', categoryController.getById);

router.post('/categories', authMiddleware, categoryController.create);
router.put('/categories/:id', authMiddleware, categoryController.update);
router.delete('/categories/:id', authMiddleware, categoryController.delete);

export default router;