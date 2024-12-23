/**
 * Safely executes an asynchronous request handler, forwarding any errors to the error-handling middleware.
 *
 * This utility wraps asynchronous route handlers, ensuring that any errors encountered during execution
 * are automatically passed to the next middleware, adhering to Express.js error-handling conventions.
 *
 * @param handler - The asynchronous route handler function to wrap.
 * @returns A middleware function that handles the request and error propagation.
 */

import { NextFunction, Request, RequestHandler, Response } from "express";

const handleAsyncErrors = (handler: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default handleAsyncErrors;
