import httpStatus from "http-status";
import HttpError from "../../errors/HttpError";
import { Experience } from "./experience.models";
import { TExperience } from "./experience.types";

// Service for fetch all Experience from db
const fetchAllFromDb = async (query: Record<string, unknown>) => {
  const experiences = await Experience.find().populate("technologies", "_id name");

  return experiences;
};

// Service for fetch all Experience from db
const createOneIntoDb = async (payload: TExperience) => {
  const experienceData = { ...payload };

  const createdExperience = await Experience.create(experienceData);

  return createdExperience;
};

// Service for fetch all Experience from db
const updateOneFromDb = async (id: string, payload: Partial<TExperience>) => {
  const experienceInfo = await Experience.findOne({ _id: id });

  if (!experienceInfo?.company) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Experience not found");
  }

  const experienceData = { ...payload };
  const updatedExperience = await Experience.findOneAndUpdate({ _id: id }, experienceData, {
    new: true,
  });

  return updatedExperience;
};

// Service for fetch all Experience from db
const deleteOneFromDb = async (id: string) => {
  const ExperienceInfo = await Experience.findOne({ _id: id });

  if (!ExperienceInfo?.company) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Experience not found");
  }

  await Experience.deleteOne({ _id: id });

  return {};
};

export const ExperienceServices = {
  fetchAllFromDb,
  createOneIntoDb,
  updateOneFromDb,
  deleteOneFromDb,
};
