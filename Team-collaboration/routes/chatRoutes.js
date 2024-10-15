const express = require('express');
const { fetchChatMessages } = require('../controllers/chatController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get chat messages for a specific room
router.get('/:roomId', authenticateUser, fetchChatMessages);

module.exports = router;
