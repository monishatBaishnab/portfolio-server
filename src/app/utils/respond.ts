import { Response } from "express";

/**
 * Type definition for the response payload.
 *
 * @template D - Type of the `data` field.
 * @template M - Type of the `meta` field.
 */
type TPayload<D, M> = {
  success?: boolean; // Defaults to true if not provided.
  status: number; // HTTP status code.
  message: string; // Descriptive message.
  data?: D; // Optional response data.
  meta?: M; // Optional metadata.
};

/**
 * Sends a structured HTTP response with a default success flag.
 *
 * @template D - Type of the `data` field.
 * @template M - Type of the `meta` field.
 * @param res - Express response object.
 * @param payload - Response details.
 */

const respond = <D, M>(res: Response, payload: TPayload<D, M>): void => {
  res.status(payload.status).json({
    success: payload.success ?? true, // Default success to true if undefined.
    ...payload,
  });
};

export default respond;
