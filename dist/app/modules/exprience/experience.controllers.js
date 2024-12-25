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
exports.ExperienceControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAsyncErrors_1 = __importDefault(require("../../utils/handleAsyncErrors"));
const respond_1 = __importDefault(require("../../utils/respond"));
const experience_services_1 = require("./experience.services");
// Controller for fetch all Experiences
const fetchAll = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Respond final result to client
    const result = yield experience_services_1.ExperienceServices.fetchAllFromDb(req.query);
    (0, respond_1.default)(res, {
        message: "Experiences fetched successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
// Controller for create new Experience
const createOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_services_1.ExperienceServices.createOneIntoDb(req.body);
    (0, respond_1.default)(res, {
        message: "Experience created successfully.",
        status: http_status_1.default.CREATED,
        data: result,
    });
}));
// Controller for update previous Experience
const updateOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield experience_services_1.ExperienceServices.updateOneFromDb(req.params.id, req.body);
    (0, respond_1.default)(res, {
        message: "Experience updated successfully.",
        status: http_status_1.default.OK,
        data: result,
    });
}));
// Controller for delete previous Experience
const deleteOne = (0, handleAsyncErrors_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield experience_services_1.ExperienceServices.deleteOneFromDb(req.params.id);
    (0, respond_1.default)(res, {
        message: "Experience deleted successfully.",
        status: http_status_1.default.CREATED,
    });
}));
exports.ExperienceControllers = {
    fetchAll,
    createOne,
    updateOne,
    deleteOne,
};
