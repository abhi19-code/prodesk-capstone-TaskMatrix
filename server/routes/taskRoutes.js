const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      assignedMember,
      dueDate
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required"
      });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      assignedMember,
      dueDate,
      ownerId: req.user.userId
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task"
    });
  }
});


// GET ALL MY TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      ownerId: req.user.userId
    });

    res.json({
      tasks
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks"
    });
  }
});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      ownerId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const {
      title,
      description,
      status,
      priority,
      assignedMember,
      dueDate
    } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedMember = assignedMember || task.assignedMember;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task"
    });
  }
});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      ownerId: req.user.userId
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await Task.deleteOne({
      _id: req.params.id
    });

    res.json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task"
    });
  }
});


module.exports = router;