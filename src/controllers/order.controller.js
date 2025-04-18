import { orderService } from '../service/index.js';
import { StatusCodes } from 'http-status-codes';

export const orderController = {
    create: async (req, res, next) => {
        try {
            const order = await orderService.create(req.body);
            res.status(StatusCodes.CREATED).json(order);
        } catch (error) {
            next(error);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const orders = await orderService.getAll();
            res.status(StatusCodes.OK).json(orders);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const order = await orderService.getById(req.params.id);
            res.status(StatusCodes.OK).json(order);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const order = await orderService.update(req.params.id, req.body);
            res.status(StatusCodes.OK).json(order);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const order = await orderService.delete(req.params.id);
            res.status(StatusCodes.OK).json(order);
        } catch (error) {
            next(error);
        }
    }
};
