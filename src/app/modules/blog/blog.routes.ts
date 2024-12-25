import { Router } from "express";
import auth from "../../middlewares/auth";
import parseJson from "../../middlewares/parseJson";
import validateRequest from "../../middlewares/validateRequest";
import { multerUp } from "../../utils/upload";
import { BlogControllers } from "./blog.controllers";
import { BlogSchemas } from "./blog.schemas";

// Create a new express router instance
const router = Router();

// Route for fetch all blogs
router.get("/", BlogControllers.fetchAll);

router.get("/:id", BlogControllers.fetchSingle);

// Route for create new Blog
router.post(
  "/",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(BlogSchemas.create),
  BlogControllers.createOne
);

// Route for update previous Blog
router.put(
  "/:id",
  auth,
  multerUp.single("file"),
  parseJson,
  validateRequest(BlogSchemas.update),
  BlogControllers.updateOne
);

// Route for delete previous Blog
router.delete("/:id", auth, BlogControllers.deleteOne);

export const BlogRoutes = router;
