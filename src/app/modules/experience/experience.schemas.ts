import { z } from "zod";

const create = z.object({
  company: z.string({ required_error: "Company name is required." }),
  designation: z.string({ required_error: "Designation is required." }),
  startDate: z.string({ required_error: "Start date is required." }),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional(),
});

const update = z.object({
  company: z.string().optional(),
  designation: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().nullable().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  technologies: z.array(z.string()).optional()
});

export const ExperienceSchemas = { create, update };
