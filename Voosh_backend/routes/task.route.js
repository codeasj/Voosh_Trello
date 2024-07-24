import express from "express";
const router = express.Router();
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  updateTaskById,
} from "../controllers/task.controller.js";
import isUser from "../middleware/auth.middleware.js";

router.post("/create", isUser, createTask);
router.get("/get", isUser, getAllTasks);
router.patch("/update/:id", isUser, updateTaskById);
router.delete("/delete/:id", isUser, deleteTaskById);

export default router;
