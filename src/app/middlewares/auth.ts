import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import handleAsyncErrors from "../utils/handleAsyncErrors";
import HttpError from "../errors/HttpError";
import { config } from "../config/config";
import { verifyToken } from "../utils/jwt";

const auth = handleAsyncErrors((req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization;

  if (!token) {
    throw new HttpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
  }

  const verifiedUser = verifyToken(token, config.jwt_access_token as string);

  if (verifiedUser?.email) {
    req.user = verifiedUser;
    next();
  } else {
    throw new HttpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
  }
});

export default auth;
