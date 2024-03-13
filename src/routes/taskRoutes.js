const express = require("express");
const { protect } = require("../middlewares/protectMiddleware");
const taskController = require("../controllers/taskController");
const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(taskController.createTask)
  .get(taskController.getAllTasks);

router
  .route("/:id")
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
