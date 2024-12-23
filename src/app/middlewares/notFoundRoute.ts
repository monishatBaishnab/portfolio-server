import { RequestHandler } from "express";
import respond from "../utils/respond";

const notFoundRoute: RequestHandler = (req, res) => {
  respond(res, {
    success: false,
    status: 404,
    message: `The API endpoint '${req?.baseUrl}' was not found.`,
  });
};

export default notFoundRoute;
