const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      results: tasks.length,
      tasks,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({
      title,
      description,
      completed,
      user: req.user._id,
    });
    res.status(201).json({
      status: "success",
      task,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data ${errors.join(", ")}`;
      return res.status(400).json(message);
    }
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = req.user._id;

    const task = await Task.findOne({ _id, user });
    // .populate("user", "username")
    if (!task) {
      return res.status(404).json({
        message: "No Task found with that ID",
      });
    }

    res.status(200).json({
      stauts: "success",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed", "description", "title"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ message: "Invalid updates " });
    }
    const task = await Task.findOne({ _id, user: req.user._id });

    if (!task) {
      return res.status(404).json({
        message: "No Task found with that ID",
      });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    cons_id = req.params.id;
    const task = await Task.findOneAndDelete({
      _id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        message: "No Task found with that ID",
      });
    }
    res.status(200).json({
      status: "success",
      deleted: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
