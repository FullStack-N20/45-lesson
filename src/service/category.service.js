import { Category } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

export const categoryService = {
    create: async (categoryData) => {
        try {
            const category = new Category(categoryData);
            return await category.save();
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await Category.find();
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getById: async (categoryId) => {
        try {
            const category = await Category.findById(categoryId);
            if (!category) {
                const error = new Error('Category not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return category;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    update: async (categoryId, updateData) => {
        try {
            const category = await Category.findByIdAndUpdate(
                categoryId,
                updateData,
                { new: true, runValidators: true }
            );
            if (!category) {
                const error = new Error('Category not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return category;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    delete: async (categoryId) => {
        try {
            const category = await Category.findByIdAndDelete(categoryId);
            if (!category) {
                const error = new Error('Category not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return category;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    }
}; 