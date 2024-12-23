import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";
import { AuthServices } from "./auth.services";

// Controller for login
const login = handleAsyncErrors(async (req, res) => {
  const result = await AuthServices.login(req.body);

  // Respond final result to client
  respond(res, {
    message: "Login successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Register for register
const register = handleAsyncErrors(async (req, res) => {
  const result = await AuthServices.register(req.body, req.file);
  respond(res, {
    message: "Registered successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

export const AuthControllers = {
  login,
  register,
};
