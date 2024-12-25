import mongoose, { Schema } from "mongoose";
import { TBlog } from "./blog.types";

const blogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, default: null },
    image: { type: String, required: true },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true }],
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model<TBlog>("Blog", blogSchema);
