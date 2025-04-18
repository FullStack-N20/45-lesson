import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { productController } from '../controllers/index.js';

const router = express.Router();

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);

router.post('/products', authMiddleware, productController.create);
router.put('/products/:id', authMiddleware, productController.update);
router.delete('/products/:id', authMiddleware, productController.delete);

export default router;