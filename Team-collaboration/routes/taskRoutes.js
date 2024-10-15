const express = require('express');
const { addTask, modifyTask, removeTask, listTasks } = require('../controllers/taskController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

// Route to create a new task
router.post('/', authenticateUser, authorizeRole(['Admin']), addTask);

// Route to update an existing task
router.put('/:taskId', authenticateUser, authorizeRole(['Admin', 'User']), modifyTask);

// Route to delete a task
router.delete('/:taskId', authenticateUser, authorizeRole(['Admin']), removeTask);

// Route to retrieve tasks
router.get('/', authenticateUser, listTasks);

module.exports = router;
