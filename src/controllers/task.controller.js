const TaskModel = require("../models/task.model");
const moment = require("moment");
const {
  addTaskService,
  getUpcomingTasksService,
  getTodayTasksService,
  getArchiveTasksService,
  changeStatusService,
  deleteTaskService,
  updateTaskService,
  getOneTaskService,
} = require("../services/task.service");

const addTask = async (req, res, next) => {
  return await addTaskService(req, res, next);
};

const getUpcomingTasks = async (req, res, next) => {
  return await getUpcomingTasksService(req, res, next);
};

const getTodayTasks = async (req, res, next) => {
  return await getTodayTasksService(req, res, next);
};

const getArchiveTasks = async (req, res, next) => {
  return await getArchiveTasksService(req, res, next);
};

const changeStatus = async (req, res, next) => {
  return changeStatusService(req, res, next);
};

const deleteTask = async (req, res, next) => {
  return await deleteTaskService(req, res, next);
};

const updateTask = async (req, res, next) => {
  return await updateTaskService(req, res, next);
};

const getOneTask = async (req, res, next) => {
  return await getOneTaskService(req, res, next);
};

module.exports = {
  addTask,
  getUpcomingTasks,
  getTodayTasks,
  getArchiveTasks,
  changeStatus,
  deleteTask,
  updateTask,
  getOneTask,
};
