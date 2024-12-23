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
exports.cloudinaryUploader = exports.multerUp = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = require("../config/config");
cloudinary_1.v2.config({
    cloud_name: config_1.config.cloudinary_cloud_name,
    api_key: config_1.config.cloudinary_api_key,
    api_secret: config_1.config.cloudinary_api_secret,
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
});
exports.multerUp = (0, multer_1.default)({ storage: storage });
const cloudinaryUploader = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file === undefined)
        return;
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.cloudinaryUploader = cloudinaryUploader;
