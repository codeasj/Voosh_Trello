import express from "express";
const router = express.Router();
import {
  register,
  login,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { validateReq } from "../middleware/validate.js";
import { imageUpload } from "../middleware/upload.middleware.js";
import { validateEmail, validatePassword } from "../utils/custom-validator.js";

router.post(
  "/register",
  imageUpload.single("icon"),
  [validateEmail("@email"), validatePassword("@password")],
  validateReq,

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
