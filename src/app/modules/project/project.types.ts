import mongoose from "mongoose";

export type TProject = {
  id?: string;
  title: string;
  description: string;
  overview: string|null;
  image: string;
  skills: mongoose.Types.ObjectId[];
  links?: { client?: string; server?: string; live?: string };
  createdAt: string;
  updatedAt: string;
};
