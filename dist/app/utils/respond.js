"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sends a structured HTTP response with a default success flag.
 *
 * @template D - Type of the `data` field.
 * @template M - Type of the `meta` field.
 * @param res - Express response object.
 * @param payload - Response details.
 */
const respond = (res, payload) => {
    var _a;
    res.status(payload.status).json(Object.assign({ success: (_a = payload.success) !== null && _a !== void 0 ? _a : true }, payload));
};
exports.default = respond;
