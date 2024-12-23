import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { config } from "./app/config/config";

let server: Server;

const bootstrap = () => {
  server = app.listen(3000, async () => {
    await mongoose.connect(config.db_uri as string);
    console.log("Database connected successfully.");
    console.log("Server running on port: 3000");
  });
};

bootstrap();
