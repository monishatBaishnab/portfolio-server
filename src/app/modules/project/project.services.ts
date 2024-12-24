import httpStatus from "http-status";
import HttpError from "../../errors/HttpError";
import { TFile } from "../../types";
import { cloudinaryUploader } from "../../utils/upload";
import { Project } from "./project.models";
import { TProject } from "./project.types";

// Service for fetch all projects from db
const fetchAllFromDb = async (query: Record<string, unknown>) => {
  const projects = await Project.find();

  return projects;
};

// Service for fetch all project from db
const createOneIntoDb = async (payload: TProject, file: TFile) => {
  if (!file) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Please send project image.");
  }
  const projectData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    projectData.image = uploadedImage.secure_url;
  }

  const createdProject = await Project.create(projectData);

  return createdProject;
};

// Service for fetch all project from db
const updateOneFromDb = async (id: string, payload: Partial<TProject>, file: TFile) => {
  const projectInfo = await Project.findOne({ _id: id });

  if (!projectInfo?.title) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Project not found");
  }

  const projectData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    projectData.image = uploadedImage.secure_url;
  }

  const updatedProject = await Project.findOneAndUpdate({ _id: id }, projectData, { new: true });

  return updatedProject;
};

// Service for fetch all project from db
const deleteOneFromDb = async (id: string) => {
  const projectInfo = await Project.findOne({ _id: id });

  if (!projectInfo?.title) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Project not found");
  }

  await Project.deleteOne({ _id: id });

  return {};
};

export const ProjectServices = {
  fetchAllFromDb,
  createOneIntoDb,
  updateOneFromDb,
  deleteOneFromDb,
};
