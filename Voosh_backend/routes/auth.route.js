import express from "express";
const router = express.Router();
import {
  register,
  login,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validateReq } from "../middleware/validate.js";
import { imageUpload } from "../middleware/upload.middleware.js";

router.post(
  "/register",
  [
    validateEmail("@email", { required: true }),
    validatePassword("@password", { required: true }),
    validateString("@firstName", { required: true }),
    validateString("@lastName"),
  ],
  validateReq,
  imageUpload.single("icon"),
  register
);
router.get("/verify/:token", verifyEmail);

router.post(
  "/login",
  [validateEmail("@email", { required: true })],
  validateReq,
  login
);

export default router;
