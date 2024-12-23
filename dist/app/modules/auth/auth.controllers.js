"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAsyncErrors_1 = __importDefault(require("../../utils/handleAsyncErrors"));
const respond_1 = __importDefault(require("../../utils/respond"));
const auth_services_1 = require("./auth.services");
// Controller for login
const login = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.login(req.body);
    // Respond final result to client
    (0, respond_1.default)(res, {
        message: "Login successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
// Register for register
const register = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.register(req.body, req.file);
    (0, respond_1.default)(res, {
        message: "Registered successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
exports.AuthControllers = {
    login,
    register,
};
