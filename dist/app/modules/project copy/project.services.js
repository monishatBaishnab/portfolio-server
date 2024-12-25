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
exports.ProjectServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const upload_1 = require("../../utils/upload");
const project_models_1 = require("./project.models");
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
// Service for fetch all projects from db
const fetchAllFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const projectQuery = new QueryBuilder_1.default(project_models_1.Project.find().populate("skills", "_id name"), query);
    const projects = yield projectQuery.paginate().sort().modelQuery;
    return projects;
});
// Service for fetch all projects from db
const fetchSingleFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_models_1.Project.findOne({ _id: id }).populate("skills", "_id, name");
    return projects;
});
// Service for fetch all project from db
const createOneIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Please send project image.");
    }
    const projectData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        projectData.image = uploadedImage.secure_url;
    }
    console.log(uploadedImage);
    const createdProject = yield project_models_1.Project.create(projectData);
    return createdProject;
});
// Service for fetch all project from db
const updateOneFromDb = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const projectInfo = yield project_models_1.Project.findOne({ _id: id });
    if (!(projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.title)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Project not found");
    }
    const projectData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        projectData.image = uploadedImage.secure_url;
    }
    const updatedProject = yield project_models_1.Project.findOneAndUpdate({ _id: id }, projectData, { new: true });
    return updatedProject;
});
// Service for fetch all project from db
const deleteOneFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const projectInfo = yield project_models_1.Project.findOne({ _id: id });
    if (!(projectInfo === null || projectInfo === void 0 ? void 0 : projectInfo.title)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Project not found");
    }
    yield project_models_1.Project.deleteOne({ _id: id });
    return {};
});
exports.ProjectServices = {
    fetchAllFromDb,
    fetchSingleFromDb,
    createOneIntoDb,
    updateOneFromDb,
    deleteOneFromDb,
};
