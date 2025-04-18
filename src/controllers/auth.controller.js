import { userService } from '../service/index.js';
import { StatusCodes } from 'http-status-codes';

export const authController = {
  signUp: async (req, res, next) => {
    try {
      const { email, password, full_name } = req.body;
      
      const result = await userService.create({ email, password, full_name });
      
      const user = { ...result.toJSON(), password: undefined };
      
      res.status(StatusCodes.CREATED).json({ user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(StatusCodes.CONFLICT).json({ 
          message: 'Email already registered' 
        });
      }
      next(error);
    }
  },
  
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      const result = await userService.login(email, password);
      
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          message: error.message 
        });
      }
      next(error);
    }
  },
  
  register: async (req, res, next) => {
    try {
      const { email, password, full_name } = req.body;
      
      const result = await userService.create({ email, password, full_name });
      
      const user = { ...result.toJSON(), password: undefined };
      
      res.status(StatusCodes.CREATED).json({ user });
    } catch (error) {
      if (error.code === 11000) { 
        return res.status(StatusCodes.CONFLICT).json({ 
          message: 'Email already registered' 
        });
      }
      next(error);
    }
  },
  
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      const result = await userService.login(email, password);
      
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          message: error.message 
        });
      }
      next(error);
    }
  }
};