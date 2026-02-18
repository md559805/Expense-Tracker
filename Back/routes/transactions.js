/**
 * Transaction Routes
 * 
 * This file defines the API routes for transaction operations.
 * All routes are prefixed with: /api/transactions
 */

const express = require('express');
const router = express.Router();

// Import controller functions
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transactionController');

// Route: /api/transactions
// - GET    : Get all transactions
// - POST   : Add a new transaction
router.route('/')
  .get(getTransactions)
  .post(addTransaction);

// Route: /api/transactions/summary
// - GET    : Get balance, income, and expenses
router.route('/summary')
  .get(getSummary);

// Route: /api/transactions/:id
// - DELETE : Delete a transaction by ID
router.route('/:id')
  .delete(deleteTransaction);

// Export the router
module.exports = router;
