import httpStatus from "http-status";
import HttpError from "../../errors/HttpError";
import { TFile } from "../../types";
import { cloudinaryUploader } from "../../utils/upload";
import { Project } from "./project.models";
import { TProject } from "./project.types";
import QueryBuilder from "../../builders/QueryBuilder";

// Service for fetch all projects from db
const fetchAllFromDb = async (query: Record<string, unknown>) => {

  const projectQuery = new QueryBuilder(Project.find().populate("skills", "_id name"), query);

  const projects = await projectQuery.paginate().modelQuery;
  return projects;
};

// Service for fetch all projects from db
const fetchSingleFromDb = async (id: string) => {
  const projects = await Project.findOne({ _id: id }).populate("skills", "_id, name");

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
  console.log(uploadedImage);
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
  fetchSingleFromDb,
  createOneIntoDb,
  updateOneFromDb,
  deleteOneFromDb,
};
