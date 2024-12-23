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
exports.SkillControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAsyncErrors_1 = __importDefault(require("../../utils/handleAsyncErrors"));
const respond_1 = __importDefault(require("../../utils/respond"));
const skill_services_1 = require("./skill.services");
// Controller for fetch all skills
const fetchAll = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Respond final result to client
    const result = yield skill_services_1.SkillServices.fetchAllFromDb(req.query);
    (0, respond_1.default)(res, {
        message: "Skills fetched successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
// Controller for create new skill
const createOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.SkillServices.createOneIntoDb(req.body, req.file);
    (0, respond_1.default)(res, {
        message: "Skill created successfully.",
        status: http_status_1.default.CREATED,
        data: result,
    });
}));
// Controller for update previous skill
const updateOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield skill_services_1.SkillServices.updateOneFromDb(req.params.id, req.body, req.file);
    (0, respond_1.default)(res, {
        message: "Skill updated successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
// Controller for delete previous skill
const deleteOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield skill_services_1.SkillServices.deleteOneFromDb(req.params.id);
    (0, respond_1.default)(res, {
        message: "Skill deleted successfully.",
        status: http_status_1.default.CREATED,
    });
}));
exports.SkillControllers = {
    fetchAll,
    createOne,
    updateOne,
    deleteOne,
};
