import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../../../domain/errors/AppError';
import logger from '../../../infrastructure/logger';

/**
 * Global Express error handler.
 * Formats errors into a consistent JSON response shape.
 * Distinguishes between operational (AppError) and unexpected (bug) errors.
 */
export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    // Known, operational error
    logger.warn({ path: req.path, statusCode: err.statusCode, message: err.message });
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  // Unknown / programmer error
  logger.error({ path: req.path, err }, 'Unexpected error');
  res.status(500).json({
    success: false,
    error: {
      message: 'An unexpected internal server error occurred.',
      statusCode: 500,
    },
  });
};
