const Task = require("../models/taskModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    results: tasks.length,
    tasks,
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
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
});

exports.getTask = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const user = req.user._id;

  const task = await Task.findOne({ _id, user });
  if (!task) {
    return next(new AppError("No Task found with that ID", 404));
  }

  res.status(200).json({
    stauts: "success",
    task,
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description", "title"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return next(new AppError("Invalid updates ", 400));
  }

  const task = await Task.findOne({ _id, user: req.user._id });

  if (!task) {
    return next(new AppError("No Task found with that ID", 404));
  }

  updates.forEach((update) => (task[update] = req.body[update]));
  await task.save();

  res.status(200).json({
    status: "success",
    task,
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const _id = req.params.id;

  const task = await Task.findOneAndDelete({
    _id,
    user: req.user._id,
  });
  
  if (!task) {
    return next(new AppError("No Task found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    deleted: true,
  });
});
