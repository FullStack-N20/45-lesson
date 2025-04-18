import { config } from "../config/index.js";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
  
  if (config.nodeEnv === "development") {
    console.error(err);
    res.status(statusCode).json({
      message,
      stack: err.stack,
      status: statusCode
    });
  } else if (config.nodeEnv === "production") {
    res.status(statusCode).json({
      message,
      status: statusCode
    });
  } else {
    res.status(statusCode).json({
      message,
      status: statusCode
    });
  }
};