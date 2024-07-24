import { validationResult } from "express-validator";
import { imageUpload } from "./upload.middleware.js";

export function validateReq(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty() && !req.fileError) return next();

  if (req.file) imageUpload._delete(req.file.filename);

  let errors = {};

  result?.errors?.forEach?.((err) => {
    errors[err.path] = err.msg;
    __help[err.path] = `${err.msg} in ${err.location}, ${
      typeof err.value !== "undefined"
        ? "received " + err.value
        : "no value received"
    }`;
  });

  if (req.fileError) {
    errors = {
      ...errors,
      ...req.fileError,
    };
  }
  console.log({ errors });

  res.status(400).json({
    status: "error",
    message: "validation error",
    errors,
  });
}
