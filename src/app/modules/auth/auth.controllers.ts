import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";

// Controller for login
const login = handleAsyncErrors(async (req, res) => {
  
    // Respond final result to client
  respond(res, {
    message: "Login successfully.",
    status: httpStatus.OK,
    data: { token: "" },
  });
});

// Register for register
const register = handleAsyncErrors(async (req, res) => {});

export const AuthControllers = {
  login,
  register,
};
