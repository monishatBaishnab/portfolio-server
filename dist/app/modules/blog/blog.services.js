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
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const HttpError_1 = __importDefault(require("../../errors/HttpError"));
const upload_1 = require("../../utils/upload");
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const blog_models_1 = require("./blog.models");
// Service for fetch all blogs from db
const fetchAllFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_models_1.Blog.find().populate("skills", "_id name"), query);
    const blogs = yield blogQuery.paginate().sort().modelQuery;
    return blogs;
});
// Service for fetch all blog from db
const fetchSingleFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_models_1.Blog.findOne({ _id: id }).populate("skills", "_id, name");
    return blog;
});
// Service for fetch all blog from db
const createOneIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Please send blog image.");
    }
    const blogData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        blogData.image = uploadedImage.secure_url;
    }
    const createdBlog = yield blog_models_1.Blog.create(blogData);
    return createdBlog;
});
// Service for fetch all blog from db
const updateOneFromDb = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const blogInfo = yield blog_models_1.Blog.findOne({ _id: id });
    if (!(blogInfo === null || blogInfo === void 0 ? void 0 : blogInfo.title)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Blog not found");
    }
    const blogData = Object.assign({}, payload);
    const uploadedImage = yield (0, upload_1.cloudinaryUploader)(file);
    if (uploadedImage === null || uploadedImage === void 0 ? void 0 : uploadedImage.secure_url) {
        blogData.image = uploadedImage.secure_url;
    }
    const updatedBlog = yield blog_models_1.Blog.findOneAndUpdate({ _id: id }, blogData, { new: true });
    return updatedBlog;
});
// Service for fetch all Blog from db
const deleteOneFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogInfo = yield blog_models_1.Blog.findOne({ _id: id });
    if (!(blogInfo === null || blogInfo === void 0 ? void 0 : blogInfo.title)) {
        throw new HttpError_1.default(http_status_1.default.BAD_REQUEST, "Blog not found");
    }
    yield blog_models_1.Blog.deleteOne({ _id: id });
    return {};
});
exports.BlogServices = {
    fetchAllFromDb,
    fetchSingleFromDb,
    createOneIntoDb,
    updateOneFromDb,
    deleteOneFromDb,
};
