"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const http_status_1 = __importDefault(require("http-status"));
/**
 * Middleware to parse JSON from a `data` property in the request body.
 *
 * This middleware parses the `data` field of the request body into a JSON object
 * and assigns it back to `req.body`. If parsing fails, it sends a `400 Bad Request` response.
 *
 * @returns Express middleware function.
 */
const parseJson = (req, res, next) => {
    try {
        if (req.body && req.body.data) {
            req.body = JSON.parse(req.body.data); // Parse the `data` field into a JSON object.
        }
        next();
    }
    catch (error) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Something want wrong.");
    }
};
exports.default = parseJson;
