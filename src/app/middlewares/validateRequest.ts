import { AnyZodObject } from "zod";
import handleAsyncErrors from "../utils/handleAsyncErrors";

const validateRequest = (schema: AnyZodObject) => {
  return handleAsyncErrors(async (req, res, next) => {
    await schema.parseAsync(req.body);
    next();
  });
};

export default validateRequest;
