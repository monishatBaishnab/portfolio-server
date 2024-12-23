import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";
import { SkillServices } from "./skill.services";

// Controller for fetch all skills
const fetchAll = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await SkillServices.fetchAllFromDb(req.query);

  respond(res, {
    message: "Skills fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for create new skill
const createOne = handleAsyncErrors(async (req, res) => {
  const result = await SkillServices.createOneIntoDb(req.body, req.file);
  respond(res, {
    message: "Skill created successfully.",
    status: httpStatus.CREATED,
    data: result,
  });
});

// Controller for update previous skill
const updateOne = handleAsyncErrors(async (req, res) => {
  const result = await SkillServices.updateOneFromDb(req.params.id, req.body, req.file);
  respond(res, {
    message: "Skill updated successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for delete previous skill
const deleteOne = handleAsyncErrors(async (req, res) => {
  await SkillServices.deleteOneFromDb(req.params.id);

  respond(res, {
    message: "Skill deleted successfully.",
    status: httpStatus.CREATED,
  });
});

export const SkillControllers = {
  fetchAll,
  createOne,
  updateOne,
  deleteOne,
};
