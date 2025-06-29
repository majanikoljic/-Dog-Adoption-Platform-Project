const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');

const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/dogs', dogRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
// This code sets up an Express.js server for a Dog Adoption API.
// It connects to a MongoDB database, uses CORS for cross-origin requests, and parses JSON request bodies.
// The server listens on a specified port and defines routes for user authentication and dog-related operations.
// The authentication routes handle user registration and login, while the dog routes manage dog registration, adoption