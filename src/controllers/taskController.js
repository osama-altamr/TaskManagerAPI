const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  try {
    console.log("requesting tasks", req.user);
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).send({
      status: "success",
      results: tasks.length,
      tasks,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        message: "Both title and description are required.",
      });
    }
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
    return res.status(500).send({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const user = req.user._id;
    const task = await Task.findOne({ _id, user }).populate("user", "username");
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
    return res.status(500).send({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed", "description"];
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
    return res.status(500).send({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({
        message: "No Task found with that ID",
      });
    }
    res.status(200).json({
      deleted: true,
    });
  } catch (err) {
    return res.status(500).send({
      status: "error",
      message: "Something went very wrong",
    });
  }
};
