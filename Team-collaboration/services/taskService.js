const Task = require('../models/taskModel');

const addNewTask = async (taskDetails) => {
  const newTask = new Task(taskDetails);
  return await newTask.save();
};

const modifyTask = async (id, updatedDetails) => {
  return await Task.findByIdAndUpdate(id, updatedDetails, { new: true });
};

const removeTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

const getFilteredTasks = async (criteria) => {
  return await Task.find(criteria);
};

module.exports = {
  addNewTask,
  modifyTask,
  removeTask,
  getFilteredTasks,
};
