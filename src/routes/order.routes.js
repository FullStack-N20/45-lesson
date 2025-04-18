import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { orderController } from '../controllers/index.js';

const router = express.Router();

router.get('/orders', authMiddleware, orderController.getAll);
router.get('/orders/:id', authMiddleware, orderController.getById);
router.post('/orders', authMiddleware, orderController.create);
router.put('/orders/:id', authMiddleware, orderController.update);
router.delete('/orders/:id', authMiddleware, orderController.delete);

export default router;