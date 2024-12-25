import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";
import { ExperienceServices } from "./experience.services";

// Controller for fetch all Experiences
const fetchAll = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await ExperienceServices.fetchAllFromDb(req.query);

  respond(res, {
    message: "Experiences fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for create new Experience
const createOne = handleAsyncErrors(async (req, res) => {
  const result = await ExperienceServices.createOneIntoDb(req.body);
  respond(res, {
    message: "Experience created successfully.",
    status: httpStatus.CREATED,
    data: result,
  });
});

// Controller for update previous Experience
const updateOne = handleAsyncErrors(async (req, res) => {
  const result = await ExperienceServices.updateOneFromDb(req.params.id, req.body);
  respond(res, {
    message: "Experience updated successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for delete previous Experience
const deleteOne = handleAsyncErrors(async (req, res) => {
  await ExperienceServices.deleteOneFromDb(req.params.id);

  respond(res, {
    message: "Experience deleted successfully.",
    status: httpStatus.CREATED,
  });
});

export const ExperienceControllers = {
  fetchAll,
  createOne,
  updateOne,
  deleteOne,
};
