const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const createAuthToken = (user) => {
  return jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const decodeAuthToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const encryptPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds);
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  createAuthToken,
  decodeAuthToken,
  encryptPassword,
  validatePassword,
};
