import { z } from "zod";

const create = z.object({
  name: z.string({ required_error: "Skill name required." }),
  tagline: z.string({ required_error: "Skill tagline required." }),
});

const update = z.object({
  name: z.string().optional(),
  tagline: z.string().optional(),
});

export const SkillSchemas = { create, update };
