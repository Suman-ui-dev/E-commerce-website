// server.js

// Import the express module
require('dotenv').config();
const express = require('express');
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, Node.js Server!');
});

// Start the server on port 3000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
