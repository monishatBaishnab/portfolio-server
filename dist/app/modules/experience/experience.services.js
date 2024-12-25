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
exports.ExperienceServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const experience_models_1 = require("./experience.models");
// Service for fetch all Experience from db
const fetchAllFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const experiences = yield experience_models_1.Experience.find().populate("technologies", "_id name");
    return experiences;
});
// Service for fetch all Experience from db
const createOneIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const experienceData = Object.assign({}, payload);
    const createdExperience = yield experience_models_1.Experience.create(experienceData);
    return createdExperience;
});
// Service for fetch all Experience from db
const updateOneFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const experienceInfo = yield experience_models_1.Experience.findOne({ _id: id });
    if (!(experienceInfo === null || experienceInfo === void 0 ? void 0 : experienceInfo.company)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Experience not found");
    }
    const experienceData = Object.assign({}, payload);
    const updatedExperience = yield experience_models_1.Experience.findOneAndUpdate({ _id: id }, experienceData, {
        new: true,
    });
    return updatedExperience;
});
// Service for fetch all Experience from db
const deleteOneFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ExperienceInfo = yield experience_models_1.Experience.findOne({ _id: id });
    if (!(ExperienceInfo === null || ExperienceInfo === void 0 ? void 0 : ExperienceInfo.company)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Experience not found");
    }
    yield experience_models_1.Experience.deleteOne({ _id: id });
    return {};
});
exports.ExperienceServices = {
    fetchAllFromDb,
    createOneIntoDb,
    updateOneFromDb,
    deleteOneFromDb,
};
