const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

// User registration endpoint
router.post('/register', registerUser);

// User login endpoint
router.post('/login', loginUser);

// Admin access route
router.get('/admin', authenticate, authorizeRole(['Admin']), (req, res) => {
  res.status(200).json({ message: 'Access granted for Admin' });
});

module.exports = router;
