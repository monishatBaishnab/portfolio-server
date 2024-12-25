import httpStatus from "http-status";
import HttpError from "../../errors/HttpError";
import { TFile } from "../../types";
import { cloudinaryUploader } from "../../utils/upload";
import QueryBuilder from "../../builders/QueryBuilder";
import { Blog } from "./blog.models";
import { TBlog } from "./blog.types";

// Service for fetch all blogs from db
const fetchAllFromDb = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find().populate("skills", "_id name"), query);

  const blogs = await blogQuery.paginate().sort().modelQuery;
  return blogs;
};

// Service for fetch all blog from db
const fetchSingleFromDb = async (id: string) => {
  const blog = await Blog.findOne({ _id: id }).populate("skills", "_id, name");

  return blog;
};

// Service for fetch all blog from db
const createOneIntoDb = async (payload: TBlog, file: TFile) => {
  if (!file) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Please send blog image.");
  }

  const blogData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    blogData.image = uploadedImage.secure_url;
  }
  
  const createdBlog = await Blog.create(blogData);

  return createdBlog;
};

// Service for fetch all blog from db
const updateOneFromDb = async (id: string, payload: Partial<TBlog>, file: TFile) => {
  const blogInfo = await Blog.findOne({ _id: id });

  if (!blogInfo?.title) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Blog not found");
  }

  const blogData = { ...payload };
  const uploadedImage = await cloudinaryUploader(file);

  if (uploadedImage?.secure_url) {
    blogData.image = uploadedImage.secure_url;
  }

  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, blogData, { new: true });

  return updatedBlog;
};

// Service for fetch all Blog from db
const deleteOneFromDb = async (id: string) => {
  const blogInfo = await Blog.findOne({ _id: id });

  if (!blogInfo?.title) {
    throw new HttpError(httpStatus.BAD_REQUEST, "Blog not found");
  }

  await Blog.deleteOne({ _id: id });

  return {};
};

export const BlogServices = {
  fetchAllFromDb,
  fetchSingleFromDb,
  createOneIntoDb,
  updateOneFromDb,
  deleteOneFromDb,
};
