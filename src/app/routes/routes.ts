import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";

// Define all available rotes and there corresponding route handler
const config = [
  {
    route: "/auth",
    handler: AuthRoutes,
  },
];

// Create a new express router instance
const router = Router();

// Loop through the routes config and register each with the router 
config.forEach(({ route, handler }) => router.use(route, handler));

// Export the configured router
export const routes = router;