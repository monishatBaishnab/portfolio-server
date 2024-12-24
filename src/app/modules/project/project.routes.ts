import { Router } from "express";
import auth from "../../middlewares/auth";
import parseJson from "../../middlewares/parseJson";
import validateRequest from "../../middlewares/validateRequest";
import { multerUp } from "../../utils/upload";
import { ProjectControllers } from "./project.controllers";
import { ProjectSchemas } from "./project.schemas";

// Create a new express router instance
const router = Router();

// Route for fetch all projects
router.get("/", ProjectControllers.fetchAll);

// Route for create new Project
router.post(
  "/",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(ProjectSchemas.create),
  ProjectControllers.createOne
);

// Route for update previous Project
router.put(
  "/:id",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(ProjectSchemas.update),
  ProjectControllers.updateOne
);

// Route for delete previous Project
router.delete("/:id", auth, ProjectControllers.deleteOne);

export const ProjectRoutes = router;
