import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";
import { ProjectServices } from "./project.services";

// Controller for fetch all Projects
const fetchAll = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await ProjectServices.fetchAllFromDb(req.query);

  respond(res, {
    message: "Projects fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for fetch all Projects
const fetchSingle = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await ProjectServices.fetchSingleFromDb(req.params.id);

  respond(res, {
    message: "Project fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for create new Project
const createOne = handleAsyncErrors(async (req, res) => {
  const result = await ProjectServices.createOneIntoDb(req.body, req.file);

  respond(res, {
    message: "Project created successfully.",
    status: httpStatus.CREATED,
    data: result,
  });
});

// Controller for update previous Project
const updateOne = handleAsyncErrors(async (req, res) => {
  const result = await ProjectServices.updateOneFromDb(req.params.id, req.body, req.file);
  respond(res, {
    message: "Project updated successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for delete previous Project
const deleteOne = handleAsyncErrors(async (req, res) => {
  await ProjectServices.deleteOneFromDb(req.params.id);

  respond(res, {
    message: "Project deleted successfully.",
    status: httpStatus.CREATED,
  });
});

export const ProjectControllers = {
  fetchAll,
  fetchSingle,
  createOne,
  updateOne,
  deleteOne,
};
