"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.sanitizeTokenData = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to sanitize and structure user data for token creation
const sanitizeTokenData = (userData) => {
    const tokenData = {
        id: userData.id,
        email: userData.email,
        profile: userData === null || userData === void 0 ? void 0 : userData.profile,
    };
    return tokenData;
};
exports.sanitizeTokenData = sanitizeTokenData;
// Function to generate a JSON Web Token (JWT) using the provided payload and secret
const generateToken = (payload, secret, expiresIn = "10d") => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    return token;
};
exports.generateToken = generateToken;
// Function to verify the provided token and extract the payload data
const verifyToken = (token, secret) => {
    const verified_user = jsonwebtoken_1.default.verify(token, secret);
    return verified_user;
};
exports.verifyToken = verifyToken;
