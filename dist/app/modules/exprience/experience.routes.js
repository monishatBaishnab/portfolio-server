"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const experience_schemas_1 = require("./experience.schemas");
const experience_controllers_1 = require("./experience.controllers");
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for fetch all experiences
router.get("/", experience_controllers_1.ExperienceControllers.fetchAll);
// Route for create new experience
router.post("/", auth_1.default, (0, validateRequest_1.default)(experience_schemas_1.ExperienceSchemas.create), experience_controllers_1.ExperienceControllers.createOne);
// Route for update previous experience
router.put("/:id", auth_1.default, (0, validateRequest_1.default)(experience_schemas_1.ExperienceSchemas.update), experience_controllers_1.ExperienceControllers.updateOne);
// Route for delete previous experience
router.delete("/:id", auth_1.default, experience_controllers_1.ExperienceControllers.deleteOne);
exports.ExperienceRoutes = router;
