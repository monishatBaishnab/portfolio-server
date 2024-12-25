import mongoose, { Schema } from "mongoose";
import { TExperience } from "./experience.types";

const experienceSchema = new Schema<TExperience>(
  {
    company: { type: String, required: true },
    designation: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    description: { type: String, default: null },
    location: { type: String, default: null },
    technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill", default: [] }],
  },
  { timestamps: true }
);

export const Experience = mongoose.model<TExperience>("Experience", experienceSchema);
