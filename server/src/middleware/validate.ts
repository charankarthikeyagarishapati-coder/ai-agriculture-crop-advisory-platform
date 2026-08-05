import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return res.status(400).json({
          error: 'Validation Error',
          details: issues
        });
      }
      return res.status(400).json({ error: 'Invalid payload structure' });
    }
  };
}
