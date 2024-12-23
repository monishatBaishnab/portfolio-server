import { Server } from "http";
import app from "./app";

let server: Server;

const bootstrap = () => {
  server = app.listen(3000, async () => {
    console.log("Server running on port: 3000");
  });
};

bootstrap();
