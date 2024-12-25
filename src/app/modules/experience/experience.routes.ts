import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ExperienceSchemas } from "./experience.schemas";
import { ExperienceControllers } from "./experience.controllers";

// Create a new express router instance
const router = Router();

// Route for fetch all experiences
router.get("/", ExperienceControllers.fetchAll);

// Route for create new experience
router.post(
  "/",
  auth,
  validateRequest(ExperienceSchemas.create), ExperienceControllers.createOne
);

// Route for update previous experience
router.put(
  "/:id",
  auth,
  validateRequest(ExperienceSchemas.update), ExperienceControllers.updateOne
);

// Route for delete previous experience
router.delete("/:id", auth, ExperienceControllers.deleteOne);

export const ExperienceRoutes = router;
