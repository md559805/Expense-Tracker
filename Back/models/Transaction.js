/**
 * Transaction Model - SQLite
 * 
 * This file defines the Transaction model with methods to interact with the
 * SQLite database. These are static methods that operate on the database.
 * 
 * Database Table: transactions
 * Columns: id, description, amount, createdAt
 */

// Import SQLite3 module
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../database.sqlite');

/**
 * Transaction class with static methods for database operations
 * All methods return Promises for async/await usage
 */
class Transaction {
  
  /**
   * Get all transactions from the database
   * @returns {Promise<Array>} Array of transaction objects
   */
  static async getAll() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath);
      db.all('SELECT * FROM transactions ORDER BY createdAt DESC', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      });
    });
  }

  /**
   * Create a new transaction in the database
   * @param {string} description - The description of the transaction
   * @param {number} amount - The amount (positive for income, negative for expense)
   * @returns {Promise<Object>} The created transaction with its ID
   */
  static async create(description, amount) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath);
      db.run(
        'INSERT INTO transactions (description, amount) VALUES (?, ?)',
        [description, amount],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, description, amount });
          }
          db.close();
        }
      );
    });
  }

  /**
   * Delete a transaction from the database
   * @param {number} id - The ID of the transaction to delete
   * @returns {Promise<Object>} Success message
   */
  static async delete(id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath);
      db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Transaction deleted' });
        }
        db.close();
      });
    });
  }

  /**
   * Get a single transaction by ID
   * @param {number} id - The ID of the transaction
   * @returns {Promise<Object|null>} The transaction object or null if not found
   */
  static async getById(id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath);
      db.get('SELECT * FROM transactions WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }
}

// Export the Transaction class
module.exports = Transaction;
