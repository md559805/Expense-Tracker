/**
 * Expense Tracker Backend - Main Entry Point
 * 
 * This is an Express.js server that provides a RESTful API for the Expense Tracker.
 * It uses SQLite as the database (no external database required).
 * 
 * API Endpoints:
 * - GET    /api/transactions         - Get all transactions
 * - POST   /api/transactions         - Add a new transaction
 * - DELETE /api/transactions/:id     - Delete a transaction
 * - GET    /api/transactions/summary - Get balance, income, and expenses
 */

// Import required modules
const express = require('express');        // Web framework
const cors = require('cors');             // Enable cross-origin requests
const dotenv = require('dotenv');         // Load environment variables
const path = require('path');              // Handle file paths

// Import database connection and routes
const connectDB = require('./config/db');  // SQLite database connection
const transactionRoutes = require('./routes/transactions'); // API routes

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to SQLite database
// This creates the database file and tables if they don't exist
connectDB().then(() => {
  console.log('Database initialized successfully');
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

// Create Express application
const app = express();

// Middleware - These run before the routes
app.use(cors());                           // Allow requests from frontend
app.use(express.json());                   // Parse JSON request bodies

// API Routes
// All routes are prefixed with /api/transactions
app.use('/api/transactions', transactionRoutes);

// Root route - Simple health check
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// Get port from environment or use default 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/transactions`);
});
