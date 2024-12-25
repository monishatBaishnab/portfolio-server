import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { SkillRoutes } from "../modules/skill/skill.routes";
import { ProjectRoutes } from "../modules/project/project.routes";
import { ExperienceRoutes } from "../modules/experience/experience.routes";
import { BlogRoutes } from "../modules/blog/blog.routes";

// Define all available rotes and there corresponding route handler
const config = [
  {
    route: "/auth",
    handler: AuthRoutes,
  },
  {
    route: "/skills",
    handler: SkillRoutes,
  },
  {
    route: "/projects",
    handler: ProjectRoutes,
  },
  {
    route: "/experiences",
    handler: ExperienceRoutes,
  },
  {
    route: "/blogs",
    handler: BlogRoutes,
  },
];

// Create a new express router instance
const router = Router();

// Loop through the routes config and register each with the router
config.forEach(({ route, handler }) => router.use(route, handler));

// Export the configured router
export const routes = router;
