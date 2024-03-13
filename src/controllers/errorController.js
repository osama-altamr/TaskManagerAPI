const AppError = require("../utils/appError");

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value:${err.keyValue.name} please use another value `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const handleJWTExpiredError = () =>
  new AppError("Your token has expired ,Please log in again", 401);

const sendError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again!", 401);

const handleCastErrorDB = (err) => {
  const path = err.path.toString().replace("_", () => " ");
  const message = `Invalid ${path}:${err.value}.`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  let error = { ...err };
  if (err.name === "CastError") {
    error = handleCastErrorDB(error);
    return sendError(error, res);
  }
  if (err.code == 11000) {
    error = handleDuplicateFieldsDB(error);
    return sendError(error, res);
  }
  if (error.name === "ValidationError") {
    error = handleValidationErrorDB(error);
    return sendError(error, res);
  }
  if (error.name === "JsonWebTokenError") {
    error = handleJWTError(error);
    return sendError(error, res);
  }
  if (error.name === "TokenExpiredError") {
    error = handleJWTExpiredError(error);
    return sendError(error, res);
  }
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
