import z from "zod";

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
});

export const AuthSchemas = { createUserSchema };
