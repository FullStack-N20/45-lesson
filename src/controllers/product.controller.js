import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../service/product.service.js';

export const createProductController = async (req, res, next) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

export const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductByIdController = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProductController = async (req, res, next) => {
    try {
        const product = await updateProduct(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProductController = async (req, res, next) => {
    try {
        const product = await deleteProduct(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};
