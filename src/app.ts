import cookieParser from "cookie-parser";
import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { routes } from "./app/routes/routes";

// Create an instance of the Express Application
const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["*"],
  })
);

// Define a GET route for the root URL
app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    status: 200,
    message: "Server running smoothly.",
  });
});

// Define all routes for the application
app.use("/api/v1", routes);



export default app;
