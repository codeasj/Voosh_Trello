import mongoose from "mongoose";
import Task from "../models/task.model.js";

// Create a new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      addedBy: req.user?.id,
    });
    res.status(201).json({
      status: "success",
      data: task,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      data: tasks,
      message: "Tasks fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update a task By Id
export const updateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Invalid Task Id");
    }
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        updatedBy: req.user?.id,
      },
      { new: true }
    );
    if (!task) {
      return res.status(400).json({
        status: "fail",
        message: "Task not found",
      });
    }
    req.status(200).json({
      status: "success",
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete a task By Id
export const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404);
      throw new Error("Invalid Task Id");
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(400)
        .json({ status: "fail", message: "Task not found" });
    }
    res
      .status(204)
      .json({ status: "success", message: "Task deleted Succesfully" });
  } catch (error) {
    next(error);
  }
};
