import { z } from "zod";

const create = z.object({
  title: z.string({ required_error: "Blog title is required." }),
  description: z.string({ required_error: "Blog description is required." }),
  content: z.string({ required_error: "Blog content is required." }).optional(),
  skills: z
    .array(z.string({ required_error: "Each skill ID must be a string." }))
    .nonempty({ message: "At least one skill is required." }),
});

const update = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

export const BlogSchemas = { create, update };
