import { categoryService } from '../service/index.js';
import { StatusCodes } from 'http-status-codes';

export const categoryController = {
    create: async (req, res, next) => {
        try {
            const category = await categoryService.create(req.body);
            res.status(StatusCodes.CREATED).json(category);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const categories = await categoryService.getAll();
            res.status(StatusCodes.OK).json(categories);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const category = await categoryService.getById(req.params.id);
            res.status(StatusCodes.OK).json(category);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const category = await categoryService.update(req.params.id, req.body);
            res.status(StatusCodes.OK).json(category);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const category = await categoryService.delete(req.params.id);
            res.status(StatusCodes.OK).json(category);
        } catch (error) {
            next(error);
        }
    }
};