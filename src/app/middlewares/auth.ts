import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import handleAsyncErrors from "../utils/handleAsyncErrors";
import HttpError from "../errors/HttpError";
import { config } from "../config/config";
import { verifyToken } from "../utils/jwt";

const auth = (...roles: string[]) => {
  return handleAsyncErrors((req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;
    console.log(token);
    if (!token) {
      console.log(token);
      throw new HttpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }

    const verified_user = verifyToken(token, config.jwt_access_token as string);

    if (roles?.length && roles.includes(verified_user.email)) {
      req.user = verified_user;
      next();
    } else {
      throw new HttpError(httpStatus.UNAUTHORIZED, "You are not authorized.");
    }
  });
};

export default auth;
