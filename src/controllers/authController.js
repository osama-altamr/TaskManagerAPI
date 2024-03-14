const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ user });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError("Please provide username and password", 400));
  }
  const user = await User.findOne({
    username,
  });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect username or passowrd", 401));
  }

  const token = signToken(user._id);
  return res.status(200).json({
    status: "success",
    token,
  });
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
