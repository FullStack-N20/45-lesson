import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

export const userService = {
    create: async (userData) => {
        try {
            const { password, ...rest } = userData;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                ...rest,
                password: hashedPassword
            });
            return await user.save();
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getAll: async () => {
        try {
            return await User.find().select('-password');
        } catch (error) {
            error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            throw error;
        }
    },

    getById: async (userId) => {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return user;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    update: async (userId, updateData) => {
        try {
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }
            
            const user = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select('-password');
            
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return user;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    delete: async (userId) => {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                const error = new Error('User not found');
                error.statusCode = StatusCodes.NOT_FOUND;
                throw error;
            }
            return user;
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    },

    login: async (email, password) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                const error = new Error('Invalid credentials');
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                const error = new Error('Invalid credentials');
                error.statusCode = StatusCodes.UNAUTHORIZED;
                throw error;
            }

            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            };
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            }
            throw error;
        }
    }
}; 