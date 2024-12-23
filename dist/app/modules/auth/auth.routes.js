"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for user login
router.post("/login", auth_controllers_1.AuthControllers.login);
// Route for register as a new user
router.post("/register", auth_controllers_1.AuthControllers.register);
exports.AuthRoutes = router;
