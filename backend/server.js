require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow requests from the frontend.
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
);

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('message');
});

// Connect the signup and login routes.
app.use('/api/auth', require('./routes/signup'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});