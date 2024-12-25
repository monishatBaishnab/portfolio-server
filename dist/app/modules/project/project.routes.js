"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const parseJson_1 = __importDefault(require("../../middlewares/parseJson"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const upload_1 = require("../../utils/upload");
const project_controllers_1 = require("./project.controllers");
const project_schemas_1 = require("./project.schemas");
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for fetch all projects
router.get("/", project_controllers_1.ProjectControllers.fetchAll);
router.get("/:id", project_controllers_1.ProjectControllers.fetchSingle);
// Route for create new Project
router.post("/", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(project_schemas_1.ProjectSchemas.create), project_controllers_1.ProjectControllers.createOne);
// Route for update previous Project
router.put("/:id", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(project_schemas_1.ProjectSchemas.update), project_controllers_1.ProjectControllers.updateOne);
// Route for delete previous Project
router.delete("/:id", auth_1.default, project_controllers_1.ProjectControllers.deleteOne);
exports.ProjectRoutes = router;
