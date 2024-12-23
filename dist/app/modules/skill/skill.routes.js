"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoutes = void 0;
const express_1 = require("express");
const skill_controllers_1 = require("./skill.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const skill_schemas_1 = require("./skill.schemas");
const upload_1 = require("../../utils/upload");
const parseJson_1 = __importDefault(require("../../middlewares/parseJson"));
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for fetch all skills
router.get("/", skill_controllers_1.SkillControllers.fetchAll);
// Route for create new skill
router.post("/", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(skill_schemas_1.SkillSchemas.create), skill_controllers_1.SkillControllers.createOne);
// Route for update previous skill
router.put("/:id", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(skill_schemas_1.SkillSchemas.update), skill_controllers_1.SkillControllers.updateOne);
// Route for delete previous skill
router.delete("/:id", auth_1.default, skill_controllers_1.SkillControllers.deleteOne);
exports.SkillRoutes = router;
