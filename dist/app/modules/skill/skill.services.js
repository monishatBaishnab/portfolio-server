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
exports.SkillServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const upload_1 = require("../../utils/upload");
const skill_models_1 = require("./skill.models");
// Service for fetch all skill from db
const fetchAllFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield skill_models_1.Skill.find();
    return skills;
});
// Service for fetch all skill from db
const createOneIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Please send skill image.");
    }
    const skillData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        skillData.image = uploadedImage.secure_url;
    }
    const createdSkill = yield skill_models_1.Skill.create(skillData);
    return createdSkill;
});
// Service for fetch all skill from db
const updateOneFromDb = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const skillInfo = yield skill_models_1.Skill.findOne({ _id: id });
    if (!(skillInfo === null || skillInfo === void 0 ? void 0 : skillInfo.name)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Skill not found");
    }
    const skillData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        skillData.image = uploadedImage.secure_url;
    }
    const updatedSkill = yield skill_models_1.Skill.findOneAndUpdate({ _id: id }, skillData, { new: true });
    return updatedSkill;
});
// Service for fetch all skill from db
const deleteOneFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const skillInfo = yield skill_models_1.Skill.findOne({ _id: id });
    if (!(skillInfo === null || skillInfo === void 0 ? void 0 : skillInfo.name)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Skill not found");
    }
    yield skill_models_1.Skill.deleteOne({ _id: id });
    return {};
});
exports.SkillServices = {
    fetchAllFromDb,
    createOneIntoDb,
    updateOneFromDb,
    deleteOneFromDb,
};
