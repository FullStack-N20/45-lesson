import { Product } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

export const productService = {
    create: async (productData) => {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await Product.find().populate('category');
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getById: async (productId) => {
        try {
            const product = await Product.findById(productId).populate('category');
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return product;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    update: async (productId, updateData) => {
        try {
            const product = await Product.findByIdAndUpdate(
                productId,
                updateData,
                { new: true, runValidators: true }
            ).populate('category');
            
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return product;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    delete: async (productId) => {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return product;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    }
};


