import { model, Schema } from "mongoose";
import { TSkill } from "./skill.types";

const SkillSchema = new Schema<TSkill>(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const Skill = model<TSkill>("Skill", SkillSchema);
