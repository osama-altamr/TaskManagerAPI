const express = require("express");
const { protect } = require("../middlewares/protectMiddleware");
const { validateObjectId } = require("../middlewares/validateIdMiddleware");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route("/:id")
  .get(validateObjectId, taskController.getTask)
  .put(validateObjectId, taskController.updateTask)
  .delete(validateObjectId, taskController.deleteTask);

module.exports = router;
