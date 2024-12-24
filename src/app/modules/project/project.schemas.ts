import { z } from "zod";

const create = z.object({
  title: z.string({ required_error: "Project title is required." }),
  description: z.string({ required_error: "Project description is required." }),
  overview: z.string({ required_error: "Project overview is required." }),
  image: z.string({ required_error: "Project image URL is required." }),
  skills: z
    .array(z.string({ required_error: "Each skill ID must be a string." }))
    .nonempty({ message: "At least one skill is required." }),
  links: z
    .object({
      client: z.string().url("Client URL must be valid.").optional(),
      server: z.string().url("Server URL must be valid.").optional(),
      live: z.string().url("Live URL must be valid.").optional(),
    })
    .optional(),
});

const update = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  overview: z.string().optional(),
  image: z.string().optional(),
  skills: z.array(z.string()).optional(),
  links: z
    .object({
      client: z.string().url("Client URL must be valid.").optional(),
      server: z.string().url("Server URL must be valid.").optional(),
      live: z.string().url("Live URL must be valid.").optional(),
    })
    .optional(),
});

export const ProjectSchemas = { create, update };
