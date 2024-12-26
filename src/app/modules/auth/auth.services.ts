import httpStatus from "http-status";
import { config } from "../../config/config";
import HttpError from "../../errors/HttpError";
import { TFile } from "../../types";
import { generateToken, sanitizeTokenData } from "../../utils/jwt";
import { cloudinaryUploader } from "../../utils/upload";
import { User } from "./auth.model";
import { TUser } from "./auth.types";
import bcrypt from "bcrypt";

// Service for login
const login = async (payload: { email: string; password: string }) => {
  const userInfo = await User.findOne({ email: payload.email }).select("_id password name email");

  // If user not found then throw error
  if (!userInfo) {
    throw new HttpError(httpStatus.NOT_FOUND, "User Not Found.");
  }
console.log(payload.password, userInfo.password);
  // Match password
  const isMatchPass = await bcrypt.compare(payload.password, userInfo.password);

  if (!isMatchPass) {
    throw new HttpError(httpStatus.UNAUTHORIZED, "Password not matched.");
  }

  // Create token data
  const tokenData = sanitizeTokenData(userInfo);

  // Create token
  const token = generateToken(tokenData, config.jwt_access_token as string);

  return { token };
};

// Service for register
const register = async (payload: TUser, file: TFile) => {
  // Copy payload
  const userData = { ...payload };

  // Upload file to cloudinary and set image link on userdata
  const uploadedFile = await cloudinaryUploader(file);
  if (uploadedFile?.secure_url) {
    userData.profile = uploadedFile?.secure_url;
  }

  // Save userdata on database
  const createdUser = await User.create(userData);

  // Create token data
  const tokenData = sanitizeTokenData(createdUser);

  // Create token
  const token = generateToken(tokenData, config.jwt_access_token as string);

  return { token };
};

export const AuthServices = {
  login,
  register,
};
