const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.status(201).send({ user });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({
        message: `Duplicate key error. Please choose a different ${err.keyValue.name} .`,
      });
    }
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((el) => el.message);
      const message = `Invalid input data ${errors.join(", ")}`;
      return res.status(400).send(message);
    }
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please provide username and password" });
    }
    const user = await User.findOne({
      username,
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .send({ message: "Incorrect username or passowrd" });
    }
    const token = signToken(user._id);
    return res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (err) {}
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};