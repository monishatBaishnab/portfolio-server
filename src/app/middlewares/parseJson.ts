import { RequestHandler } from "express";
import HttpError from "../errors/HttpError";
import httpStatus from "http-status";

/**
 * Middleware to parse JSON from a `data` property in the request body.
 *
 * This middleware parses the `data` field of the request body into a JSON object
 * and assigns it back to `req.body`. If parsing fails, it sends a `400 Bad Request` response.
 *
 * @returns Express middleware function.
 */
const parseJson: RequestHandler = (req, res, next) => {
  try {
    if (req.body && req.body.data) {
      req.body = JSON.parse(req.body.data); // Parse the `data` field into a JSON object.
    }
    next();
  } catch (error) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Something want wrong.");
  }
};

export default parseJson;
