import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

// Create a new express router instance
const router = Router();

// Route for user login
router.post("/login", AuthControllers.login);

// Route for register as a new user
router.post("/register", AuthControllers.register);

export const AuthRoutes = router;
