import { Order } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

export const orderService = {
    create: async (orderData) => {
        try {
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await Order.find()
                .populate('user')
                .populate('product');
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getById: async (orderId) => {
        try {
            const order = await Order.findById(orderId)
                .populate('user')
                .populate('product');
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return order;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    update: async (orderId, updateData) => {
        try {
            const order = await Order.findByIdAndUpdate(
                orderId,
                updateData,
                { new: true, runValidators: true }
            )
            .populate('user')
            .populate('product');
            
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return order;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    delete: async (orderId) => {
        try {
            const order = await Order.findByIdAndDelete(orderId);
            if (!order) {
                const error = new Error('Order not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return order;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    }
}; 