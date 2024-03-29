const express = require("express");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.use(globalErrorHandler);

module.exports = app;
