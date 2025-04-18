import { userService } from '../service/index.js';
import { StatusCodes } from 'http-status-codes';

export const userController = {
    create: async (req, res, next) => {
        try {
            const user = await userService.create(req.body);
            res.status(StatusCodes.CREATED).json(user);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll();
            res.status(StatusCodes.OK).json(users);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const user = await userService.getById(req.params.id);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const user = await userService.update(req.params.id, req.body);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const user = await userService.delete(req.params.id);
            res.status(StatusCodes.OK).json(user);
        } catch (error) {
            next(error);
        }
    }
};