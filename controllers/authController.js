const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required' });

    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: 'Username already exists' });

    user = new User({ username, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username and password are required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
// This code defines the authentication controller for user registration and login.
// It includes functions to register a new user and log in an existing user.
// The `generateToken` function creates a JWT for the user, which is returned upon successful registration or login.
// The `register` function checks for existing users, creates a new user if the username is available, and returns a token.
// The `login` function verifies the user's credentials and returns a token if they are valid.
// Both functions handle errors and respond with appropriate status codes and messages.
