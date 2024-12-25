import cookieParser from "cookie-parser";
import { Application } from "express";
import express from "express";
import cors from "cors";
import { routes } from "./app/routes/routes";
import httpStatus from "http-status";
import handleAsyncErrors from "./app/utils/handleAsyncErrors";
import respond from "./app/utils/respond";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

// Create an instance of the Express Application
const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://monishat-portfolio.web.app"],
  })
);

// Define a GET route for the root URL
app.get(
  "/",
  handleAsyncErrors(async (req, res) => {
    // Respond final result to client
    respond(res, {
      message: "Server login successfully.",
      status: httpStatus.OK,
    });
  })
);

// Define all routes for the application
app.use("/api/v1", routes);

// Middleware to handle 404 (Not Found) errors
app.use("*", notFoundRoute);

// Middleware to handle global errors
app.use(globalErrorHandler);

export default app;
