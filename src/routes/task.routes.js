const express = require("express");
const {
  addTask,
  getTodayTasks,
  getArchiveTasks,
  changeStatus,
  deleteTask,
  getUpcomingTasks,
} = require("../controllers/task.controller");
const { commonError } = require("../middleWares/commonError");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

const router = express.Router();

const verifyJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await UserModel.findOne({ _id: decoded.id });
  if (!user) res.status(500).json({ message: "Invalid Token" });
  else {
    req.user = user;
    next();
  }
};

router.post("/add", verifyJwt, addTask, commonError);
router.get("/today", verifyJwt, getTodayTasks, commonError);
router.get("/upcoming", verifyJwt, getUpcomingTasks, commonError);
router.get("/previous", verifyJwt, getArchiveTasks, commonError);
router.put("/status/:id", verifyJwt, changeStatus, commonError);
router.delete("/del/:id", verifyJwt, deleteTask, commonError);

module.exports = router;
