// Handles user-related business logic
const User = require('../models/userModel');

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // TODO: Add validation and password hashing
    const userId = await User.create({ username, email, password });
    res.status(201).json({ id: userId, username, email });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
