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
  else next(req, res);
};

router.post("/add", verifyJwt, addTask, commonError);
router.get("/upcoming/:email", getUpcomingTasks, commonError);
router.get("/today/:email", getTodayTasks, commonError);
router.get("/previous/:email", getArchiveTasks, commonError);
router.put("/status/:id", changeStatus, commonError);
router.delete("/del/:id", deleteTask, commonError);

module.exports = router;
