import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../../../domain/errors/AppError';

/**
 * validate — Zod validation middleware factory.
 * Usage: router.post('/path', validate(MySchema), controller.handler)
 */
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join('; ');
        next(new ValidationError(messages));
      } else {
        next(error);
      }
    }
  };
}
