# 💰 Expense Tracker (Full‑Stack Web Application)

A comprehensive **Expense Management System** built to record, categorize, and visualize personal financial transactions.  
This project showcases complete **frontend, backend, and database integration**, designed for clean scalability and maintainability.

> 🧠 **Note:** For **educational purposes**, I have included detailed **comments in every file** explaining logic, architecture, and design decisions.

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

**Database**
- SQLite file `database.sqlite` stored locally  
- Initialized automatically at runtime if it does not exist  
- Schema defined via SQL statements in `config/db.js`   

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

## 📜 License

This project is distributed under the **MIT License**.

You are free to:
- Use the project for personal or commercial purposes
- Modify and extend the source code
- Distribute copies of the software

As long as the original copyright and license notice are included.

---

## 👤 Author

**Developed by Matt**

Full‑Stack Developer specializing in:
- Frontend / Backend Integration  
- Database Design & Data Persistence  
- UI ↔ Backend Synchronization  

Known for:
- Clean architecture
- Educational, well‑commented codebases
- Engineering transparency and maintainability

💼 **GitHub Profile:**  
<https://github.com/md559805>

