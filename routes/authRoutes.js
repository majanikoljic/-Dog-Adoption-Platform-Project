const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
// This code defines the authentication routes for user registration and login.
// It uses Express to create a router and maps the POST requests to the appropriate controller functions.
// The `register` function handles user registration, while the `login` function handles user login
