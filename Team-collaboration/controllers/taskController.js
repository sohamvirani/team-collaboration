const Task = require('../models/taskModel');

// Function to create a new task
const createTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;

  try {
    const newTask = await Task.create({ title, description, assignedTo, dueDate });
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Function to update an existing task
const updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Function to delete a task by ID
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const taskToDelete = await Task.findByIdAndDelete(taskId);
    if (!taskToDelete) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task successfully deleted' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Function to retrieve tasks based on filters
const getTasks = async (req, res) => {
  const { status, assignedTo, dueDate } = req.query;
  const filterCriteria = {};

  if (status) filterCriteria.status = status;
  if (assignedTo) filterCriteria.assignedTo = assignedTo;
  if (dueDate) filterCriteria.dueDate = { $lte: dueDate }; // Only tasks due by the specified date

  try {
    const tasksList = await Task.find(filterCriteria).populate('assignedTo', 'name email');
    res.status(200).json({ success: true, data: tasksList });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getTasks
};
