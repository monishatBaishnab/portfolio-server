"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const skill_routes_1 = require("../modules/skill/skill.routes");
// Define all available rotes and there corresponding route handler
const config = [
    {
        route: "/auth",
        handler: auth_routes_1.AuthRoutes,
    },
    {
        route: "/skills",
        handler: skill_routes_1.SkillRoutes,
    },
];
// Create a new express router instance
const router = (0, express_1.Router)();
// Loop through the routes config and register each with the router
config.forEach(({ route, handler }) => router.use(route, handler));
// Export the configured router
exports.routes = router;
