const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");

const Task = require("../src/models/taskModel");
const User = require("../src/models/userModel");

dotenv.config({ path: "src/config.env" });

const DB = process.env.DATABASE;
mongoose.connect(DB, {});

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const tasks = JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, "utf-8"));

const importData = async () => {
  try {
    await User.create(users);
    await Task.create(tasks);
  } catch (err) {
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();
  } catch (err) {}
  process.exit();
};


if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
