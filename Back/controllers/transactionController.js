/**
 * Transaction Controller
 * 
 * This file contains the route handlers for the transaction API endpoints.
 * Each function handles a specific HTTP request and interacts with the Transaction model.
 */

const Transaction = require('../models/Transaction');

/**
 * Get all transactions
 * 
 * Endpoint: GET /api/transactions
 * Returns: Array of all transactions ordered by date (newest first)
 */
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.getAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Add a new transaction
 * 
 * Endpoint: POST /api/transactions
 * Body: { description: string, amount: number }
 * Returns: The created transaction with its ID
 * 
 * Note: Use positive numbers for income, negative numbers for expenses
 * Example: { description: "Salary", amount: 1000 }  // income
 *          { description: "Rent", amount: -500 }    // expense
 */
exports.addTransaction = async (req, res) => {
  try {
    const { description, amount } = req.body;

    const transaction = await Transaction.create(description, amount);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete a transaction
 * 
 * Endpoint: DELETE /api/transactions/:id
 * Params: id - The ID of the transaction to delete
 * Returns: Success message
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.getById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await Transaction.delete(req.params.id);
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get transaction summary
 * 
 * Endpoint: GET /api/transactions/summary
 * Returns: { balance, income, expenses }
 * 
 * - balance: Total of all transactions (income - expenses)
 * - income: Sum of all positive amounts
 * - expenses: Sum of all negative amounts (stored as negative)
 */
exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.getAll();

    // Calculate total balance (sum of all amounts)
    const balance = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    // Calculate total income (only positive amounts)
    const income = transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    // Calculate total expenses (only negative amounts)
    const expenses = transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    res.status(200).json({ balance, income, expenses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
