import httpStatus from "http-status";
import handleAsyncErrors from "../../utils/handleAsyncErrors";
import respond from "../../utils/respond";
import { BlogServices } from "./blog.services";

// Controller for fetch all Blogs
const fetchAll = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await BlogServices.fetchAllFromDb(req.query);

  respond(res, {
    message: "Blogs fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for fetch all Blogs
const fetchSingle = handleAsyncErrors(async (req, res) => {
  // Respond final result to client
  const result = await BlogServices.fetchSingleFromDb(req.params.id);

  respond(res, {
    message: "Blog fetched successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for create new Blog
const createOne = handleAsyncErrors(async (req, res) => {
  const result = await BlogServices.createOneIntoDb(req.body, req.file);

  respond(res, {
    message: "Blog created successfully.",
    status: httpStatus.CREATED,
    data: result,
  });
});

// Controller for update previous Blog
const updateOne = handleAsyncErrors(async (req, res) => {
  const result = await BlogServices.updateOneFromDb(req.params.id, req.body, req.file);
  respond(res, {
    message: "Blog updated successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

// Controller for delete previous Blog
const deleteOne = handleAsyncErrors(async (req, res) => {
  await BlogServices.deleteOneFromDb(req.params.id);

  respond(res, {
    message: "Blog deleted successfully.",
    status: httpStatus.CREATED,
  });
});

export const BlogControllers = {
  fetchAll,
  fetchSingle,
  createOne,
  updateOne,
  deleteOne,
};
