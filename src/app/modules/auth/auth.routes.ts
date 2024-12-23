import { Router } from "express";
import { AuthControllers } from "./auth.controllers";
import { multerUp } from "../../utils/upload";
import parseJson from "../../middlewares/parseJson";
import validateRequest from "../../middlewares/validateRequest";
import { AuthSchemas } from "./auth.schemas";

// Create a new express router instance
const router = Router();

// Route for user login
router.post("/login", AuthControllers.login);

// Route for register as a new user
router.post(
  "/register",
  multerUp.single("file"),
  parseJson,
  validateRequest(AuthSchemas.createUserSchema),
  AuthControllers.register
);

export const AuthRoutes = router;
