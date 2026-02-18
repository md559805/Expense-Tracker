# 💰 Expense Tracker

A **Full‑Stack Expense Management Web Application** built to help users record, categorize, and visualize their personal financial transactions.  
This project includes a **frontend**, **backend**, and a **database** layer — providing a complete end‑to‑end architecture for a real‑world financial tracking system.

---

## 🧩 Overview

The **Expense Tracker** allows users to:

- Add, update, and delete expenses  
- Categorize spending (e.g., Food, Transport, Bills, Entertainment)  
- View their total monthly or daily expenses  
- Store data securely using MongoDB  
- Access a responsive and intuitive web interface  

Designed using **Node.js**, **Express**, and **MongoDB**, this application showcases clean architectural separation between the backend logic, database handling, and frontend presentation.

---

## 🏗️ Project Architecture

**Front‑end:**  
- Developed using **HTML**, **CSS**, and **JavaScript**  
- Provides real‑time interaction and table views of entered expenses  
- Built for usability and quick data input  

**Back‑end:**  
- Powered by **Node.js + Express.js**  
- Handles RESTful API requests for CRUD operations  
- Implements routing, controllers, and modular structure for maintainability  

**Database:**  
- **MongoDB** for persistent expense storage  
- Mongoose models define strict schema and relations  
- Ensures fast query execution and data integrity  

---

## ⚙️ Installation Guide

Follow these steps to set up and run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/md559805/Expense-Tracker.git
cd Expense-Tracker
```

2️⃣ Install Dependencies
```bash
npm install
```

3️⃣ Configure Environment Variables
Create a .env file in the project root:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
```

4️⃣ Start MongoDB
Ensure MongoDB is running locally or remotely.

5️⃣ Run the Application in Backend
```bash
npm start
Your server will run at:
```

👉 http://localhost:3000

And then,

👉 Run the index.html in Frontend
