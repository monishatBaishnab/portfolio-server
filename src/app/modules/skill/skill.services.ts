import httpStatus from "http-status";
import HttpError from "../../errors/HttpError";
import { TFile } from "../../types";
import { cloudinaryUploader } from "../../utils/upload";
import { Skill } from "./skill.models";
import { TSkill } from "./skill.types";

// Service for fetch all skill from db
const fetchAllFromDb = async (query: Record<string, unknown>) => {
  const skills = await Skill.find();

  return skills;
};

// Service for fetch all skill from db
const createOneIntoDb = async (payload: TSkill, file: TFile) => {
  if (!file) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Please send skill image.");
  }
  const skillData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    skillData.image = uploadedImage.secure_url;
  }

  const createdSkill = await Skill.create(skillData);

  return createdSkill;
};

// Service for fetch all skill from db
const updateOneFromDb = async (id: string, payload: Partial<TSkill>, file: TFile) => {
  const skillInfo = await Skill.findOne({ _id: id });

  if (!skillInfo?.name) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Skill not found");
  }

  const skillData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    skillData.image = uploadedImage.secure_url;
  }

  const updatedSkill = await Skill.findOneAndUpdate({ _id: id }, skillData, { new: true });

  return updatedSkill;
};

// Service for fetch all skill from db
const deleteOneFromDb = async (id: string) => {
  const skillInfo = await Skill.findOne({ _id: id });

  if (!skillInfo?.name) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Skill not found");
  }

  await Skill.deleteOne({ _id: id });

  return {};
};

export const SkillServices = {
  fetchAllFromDb,
  createOneIntoDb,
  updateOneFromDb,
  deleteOneFromDb,
};
