import express from 'express';
import cors from 'cors'; // Use import instead of require
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Add .js extension
import authRoutes from './routes/authRoutes.js'; // Add .js extension

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Mount the authRoutes under /api/auth

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err); // Log the error
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});