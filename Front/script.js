const balanceValue = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

const API_URL = 'http://localhost:3000/api/transactions';

let transactions = [];

transactionFormEl.addEventListener("submit", addTransaction);

// Fetch transactions from backend
async function fetchTransactions() {
  try {
    const response = await fetch(API_URL);
    transactions = await response.json();
    updateTransactionList();
    updateSummary();
    turnColor();
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

async function addTransaction(e) {
  e.preventDefault();

  // get form values
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, amount }),
    });

    if (response.ok) {
      const newTransaction = await response.json();
      transactions.push(newTransaction);
      updateTransactionList();
      updateSummary();
      turnColor();
      transactionFormEl.reset();
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";

  const sortedTransactions = [...transactions].reverse();

  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
  
    ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
  `;

  return li;
}

function updateSummary() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceValue.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

async function removeTransaction(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      transactions = transactions.filter((transaction) => transaction.id !== id);
      updateTransactionList();
      updateSummary();
      turnColor();
    }
  } catch (error) {
    console.error('Error removing transaction:', error);
  }
}

// Make removeTransaction available globally
window.removeTransaction = removeTransaction;

// initial render
fetchTransactions();

function turnColor() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  // Smooth color interpolation based on balance
  if (balance >= 0) {
    // Positive/Green gradient (smooth back to normal)
    document.documentElement.style.setProperty('--bg-main', 'linear-gradient(135deg, #2e8b57, #a8d5ba)');
    document.documentElement.style.setProperty('--bg-balance', 'linear-gradient(135deg, #a8d5ba, #6b8e23)');
    document.documentElement.style.setProperty('--btn-bg', 'linear-gradient(135deg, #2e8b57, #3cb371)');
    document.body.style.setProperty('--title-color', '#1a202c');
  } else {
    // Negative/Red gradient (smooth transition to negative)
    document.documentElement.style.setProperty('--bg-main', 'linear-gradient(135deg, #000000, #9b0000)');
    document.documentElement.style.setProperty('--bg-balance', 'linear-gradient(135deg, #1a0000, #b30000)');
    document.documentElement.style.setProperty('--btn-bg', 'linear-gradient(135deg, #400000, #b30000)');
    document.body.style.setProperty('--title-color', '#ffffff');
  }
}
