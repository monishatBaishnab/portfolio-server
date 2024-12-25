import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { config } from "./app/config/config";

let server: Server;

const bootstrap = async () => {
  try {
    await mongoose.connect(config.db_uri as string);
    server = app.listen(3000, () => {
      console.log("Database connected successfully.");
      console.log("Server running on port: 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

bootstrap();

process.on('unhandledRejection', (err) => {
  console.log(`😈 Unhandled Rejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 Uncaught Exception is detected , shutting down ...`);
  process.exit(1);
});

