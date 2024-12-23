import { Router } from "express";
import { SkillControllers } from "./skill.controllers";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SkillSchemas } from "./skill.schemas";
import { multerUp } from "../../utils/upload";
import parseJson from "../../middlewares/parseJson";

// Create a new express router instance
const router = Router();

// Route for fetch all skills
router.get("/", SkillControllers.fetchAll);

// Route for create new skill
router.post(
  "/",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(SkillSchemas.create),
  SkillControllers.createOne
);

// Route for update previous skill
router.put(
  "/:id",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(SkillSchemas.update),
  SkillControllers.updateOne
);

// Route for delete previous skill
router.delete("/:id", auth, SkillControllers.deleteOne);

export const SkillRoutes = router;
