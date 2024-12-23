"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const upload_1 = require("../../utils/upload");
const parseJson_1 = __importDefault(require("../../middlewares/parseJson"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_schemas_1 = require("./auth.schemas");
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for user login
router.post("/login", auth_controllers_1.AuthControllers.login);
// Route for register as a new user
router.post("/register", upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(auth_schemas_1.AuthSchemas.createUserSchema), auth_controllers_1.AuthControllers.register);
exports.AuthRoutes = router;
