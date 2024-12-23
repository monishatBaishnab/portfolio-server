"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.config = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
};
