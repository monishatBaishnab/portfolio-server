"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const parseJson_1 = __importDefault(require("../../middlewares/parseJson"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const upload_1 = require("../../utils/upload");
const blog_controllers_1 = require("./blog.controllers");
const blog_schemas_1 = require("./blog.schemas");
// Create a new express router instance
const router = (0, express_1.Router)();
// Route for fetch all blogs
router.get("/", blog_controllers_1.BlogControllers.fetchAll);
router.get("/:id", blog_controllers_1.BlogControllers.fetchSingle);
// Route for create new Blog
router.post("/", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(blog_schemas_1.BlogSchemas.create), blog_controllers_1.BlogControllers.createOne);
// Route for update previous Blog
router.put("/:id", auth_1.default, upload_1.multerUp.single("file"), parseJson_1.default, (0, validateRequest_1.default)(blog_schemas_1.BlogSchemas.update), blog_controllers_1.BlogControllers.updateOne);
// Route for delete previous Blog
router.delete("/:id", auth_1.default, blog_controllers_1.BlogControllers.deleteOne);
exports.BlogRoutes = router;
