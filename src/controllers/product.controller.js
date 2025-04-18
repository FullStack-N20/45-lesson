import { productService } from '../service/index.js';
import { StatusCodes } from 'http-status-codes';

export const productController = {
    create: async (req, res, next) => {
        try {
            const product = await productService.create(req.body);
            res.status(StatusCodes.CREATED).json(product);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const products = await productService.getAll();
            res.status(StatusCodes.OK).json(products);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const product = await productService.getById(req.params.id);
            res.status(StatusCodes.OK).json(product);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const product = await productService.update(req.params.id, req.body);
            res.status(StatusCodes.OK).json(product);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const product = await productService.delete(req.params.id);
            res.status(StatusCodes.OK).json(product);
        } catch (error) {
            next(error);
        }
    }
};
