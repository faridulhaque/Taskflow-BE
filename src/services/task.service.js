const TaskModel = require("../models/task.model");
const moment = require("moment");

const addTaskService = async (req, res, next) => {
  try {
    const payload = {
      email: req.user.email,
      title: req.body.title,
      description: "n/a",
      time: req.body.time,
      date: req.body.date,
      complete: false,
    };

    const newTask = new TaskModel(payload);
    const data = await newTask.save();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getUpcomingTasksService = async (req, res, next) => {
  try {
    const email = req.user.email;
    const today = moment().format("YYYY-MM-DD");

    const tasks = await TaskModel.find({ email, date: { $gt: today } })
      .sort({ date: 1, time: 1 })
      .exec();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTodayTasksService = async (req, res, next) => {
  try {
    const email = req.user.email;

    const today = moment().format("YYYY-MM-DD");
    const tasks = await TaskModel.find({ email, date: today }).sort({
      time: -1,
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getArchiveTasksService = async (req, res, next) => {
  try {
    const email = req.user.email;
    if (email) {
      const today = moment().format("YYYY-MM-DD");

      const tasks = await TaskModel.find({ email, date: { $lt: today } }).sort({
        date: -1,
        time: -1,
      });
      res.status(200).json(tasks);
    }
  } catch (error) {
    next(error);
  }
};

const changeStatusService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.user.email;
    const task = await TaskModel.findOne({ _id: id, email: email });

    const uTask = await TaskModel.findByIdAndUpdate(id, {
      complete: !task.complete,
    });
    res.status(200).json(uTask);
  } catch (error) {
    next(error);
  }
};

const deleteTaskService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.user.email;

    const task = await TaskModel.findOne({ _id: id, email: email });

    const result = await TaskModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateTaskService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.user.email;

    const task = await TaskModel.findOneAndUpdate(
      { _id: id, email },
      {
        title: req.body.title,

        date: req.body.date,
        time: req.body.time,
      },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const getOneTaskService = async (req, res, next) => {
  try {
    const id = req.params.id;
    const email = req.user.email;

    const result = await TaskModel.findOne({ _id: id, email: email });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTaskService,
  getUpcomingTasksService,
  getTodayTasksService,
  getArchiveTasksService,
  changeStatusService,
  deleteTaskService,
  updateTaskService,
  getOneTaskService,
};
