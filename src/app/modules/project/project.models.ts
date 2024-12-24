import mongoose, { Schema } from "mongoose";
import { TProject } from "./project.types";

const projectSchema = new Schema<TProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    overview: { type: String, required: true },
    image: { type: String, required: true },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true }],
    links: {
      client: { type: String, default: null },
      server: { type: String, default: null },
      live: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<TProject>("Project", projectSchema);
