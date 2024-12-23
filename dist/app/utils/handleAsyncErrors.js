"use strict";
/**
 * Safely executes an asynchronous request handler, forwarding any errors to the error-handling middleware.
 *
 * This utility wraps asynchronous route handlers, ensuring that any errors encountered during execution
 * are automatically passed to the next middleware, adhering to Express.js error-handling conventions.
 *
 * @param handler - The asynchronous route handler function to wrap.
 * @returns A middleware function that handles the request and error propagation.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleAsyncErrors = (handler) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = handleAsyncErrors;
