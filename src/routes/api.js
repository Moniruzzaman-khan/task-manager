const express = require('express');
const UsersController = require("../controllers/UsersController")
const TasksController = require("../controllers/TasksController")
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware")






const router = express.Router();


router.post("/registration",UsersController.registration);
router.post("/login",UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);

router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);
router.post("/deleteTask",AuthVerifyMiddleware,TasksController.deleteTask);
router.post("/updateTask/:id/:status",AuthVerifyMiddleware,TasksController.updateTask);
router.get("/listTask/:status",AuthVerifyMiddleware,TasksController.listTask);
router.get("/taskCount",AuthVerifyMiddleware,TasksController.taskCount);

module.exports=router;