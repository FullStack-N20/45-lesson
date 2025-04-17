import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
} from '../controllers/product.controller.js';

const router = express.Router();


router.get('/', getAllProductsController);
router.get('/:id', getProductByIdController);


router.post('/', authMiddleware, createProductController);
router.put('/:id', authMiddleware, updateProductController);
router.delete('/:id', authMiddleware, deleteProductController);

export default router;