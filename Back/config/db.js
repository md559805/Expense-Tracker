/**
 * Database Configuration - SQLite
 * 
 * This file handles the connection to the SQLite database.
 * SQLite is a file-based database, so no external server is needed.
 * 
 * The database file is stored at: Back/database.sqlite
 */

// Import SQLite3 module
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, '../database.sqlite');

/**
 * Connect to SQLite database and create tables if needed
 * @returns {Promise} Resolves when connection is successful
 */
const connectDB = () => {
  return new Promise((resolve, reject) => {
    // Open database connection
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to SQLite:', err.message);
        reject(err);
      } else {
        console.log('✓ Connected to SQLite database');
        
        // Create transactions table if it doesn't exist
        // Table schema:
        // - id: Integer PRIMARY KEY (auto-increment)
        // - description: Text (required)
        // - amount: Real number (required)
        // - createdAt: DateTime (defaults to current timestamp)
        db.run(`
          CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            console.error('Error creating table:', err.message);
            reject(err);
          } else {
            console.log('✓ Transactions table ready');
            resolve(db);
          }
        });
      }
    });
  });
};

// Export the connectDB function
module.exports = connectDB;
