import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "http-status";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const success = false;
  const statusCode = err?.statusCode ?? INTERNAL_SERVER_ERROR;
  const message = "Something want wrong";
  const error = err?.message ?? "";
  
  //setting default values
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    error: error,
  });
};

export default globalErrorHandler;
