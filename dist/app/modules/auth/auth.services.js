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
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config/config");
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const jwt_1 = require("../../utils/jwt");
const upload_1 = require("../../utils/upload");
const auth_model_1 = require("./auth.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Service for login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield auth_model_1.User.findOne({ email: payload.email }).select("_id password name email");
    // If user not found then throw error
    if (!userInfo) {
        throw new HttpError_1.default(http_status_1.default.NOT_FOUND, "User Not Found.");
    }
    console.log(payload.password, userInfo.password);
    // Match password
    const isMatchPass = yield bcrypt_1.default.compare(payload.password, userInfo.password);
    if (!isMatchPass) {
        throw new HttpError_1.default(http_status_1.default.UNAUTHORIZED, "Password not matched.");
    }
    // Create token data
    const tokenData = (0, jwt_1.sanitizeTokenData)(userInfo);
    // Create token
    const token = (0, jwt_1.generateToken)(tokenData, config_1.config.jwt_access_token);
    return { token };
});
// Service for register
const register = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    // Copy payload
    const userData = Object.assign({}, payload);
    // Upload file to cloudinary and set image link on userdata
    const uploadedFile = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.secure_url) {
        userData.profile = uploadedFile === null || uploadedFile === void 0 ? void 0 : uploadedFile.secure_url;
    }
    // Save userdata on database
    const createdUser = yield auth_model_1.User.create(userData);
    // Create token data
    const tokenData = (0, jwt_1.sanitizeTokenData)(createdUser);
    // Create token
    const token = (0, jwt_1.generateToken)(tokenData, config_1.config.jwt_access_token);
    return { token };
});
exports.AuthServices = {
    login,
    register,
};
