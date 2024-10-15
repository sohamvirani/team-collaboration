const roleMiddleware = (allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Access forbidden: insufficient permissions' });
  }
  next();
};

module.exports = roleMiddleware;
