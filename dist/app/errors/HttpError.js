"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom error class for handling HTTP-specific errors.
 *
 * Extends the native `Error` class to include an HTTP status code and stack trace.
 */
class HttpError extends Error {
    /**
     * Creates an instance of `HttpError`.
     *
     * @param statusCode - HTTP status code associated with the error.
     * @param message - Descriptive error message.
     * @param stack - Optional stack trace for debugging purposes.
     */
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        // Set the stack trace to the provided value or capture the current stack trace.
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = HttpError;
