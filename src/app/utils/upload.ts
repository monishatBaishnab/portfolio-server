import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { TCloudinaryResponse, TFile } from "../types";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "../config/config";

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const multerUp = multer({ storage: storage });

export const cloudinaryUploader = async (
  file: TFile | undefined
): Promise<TCloudinaryResponse | undefined> => {
  if (file === undefined) return;

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: Error, result: TCloudinaryResponse) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
