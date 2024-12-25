import mongoose from "mongoose";

export type TBlog = {
  title: string;
  description: string;
  content: string|null;
  image: string;
  skills: mongoose.Types.ObjectId[];
  createdAt: string;
  updatedAt: string;
};
