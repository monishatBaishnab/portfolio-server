"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleAsyncErrors_1 = __importDefault(require("../utils/handleAsyncErrors"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const config_1 = require("../config/config");
const jwt_1 = require("../utils/jwt");
const auth = (...roles) => {
    return (0, handleAsyncErrors_1.default)((req, res, next) => {
        var _a;
        const token = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        console.log(token);
        if (!token) {
            console.log(token);
            throw new HttpError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized.");
        }
        const verified_user = (0, jwt_1.verifyToken)(token, config_1.config.jwt_access_token);
        if ((roles === null || roles === void 0 ? void 0 : roles.length) && roles.includes(verified_user.email)) {
            req.user = verified_user;
            next();
        }
        else {
            throw new HttpError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized.");
        }
    });
};
exports.default = auth;
