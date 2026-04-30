# 🚀 Team Manager (Full-Stack Task Manager)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

Team Manager is a full-stack project management application featuring a real-time task , role-based access control (RBAC), and secure JWT authentication. It was built using a strict N-Tier architecture on the backend and a modern, responsive React UI.

**[🔴 Live Demo](https://team-manager-green-pi.vercel.app/)**

---

## ✨ Features

- **Secure Authentication:** User registration and login utilizing `bcrypt` for password hashing and JSON Web Tokens (JWT) for session management.
- **Role-Based Access Control (RBAC):** Distinct permissions for 'Admin' and 'Member' roles. Only Admins can create projects and delete tasks.
- **Kanban Board Interface:** Interactive drag-and-drop style task management (Todo, In-Progress, Done).
- **Task Assignment:** Assign specific team members to tasks with dynamic UI indicators.
- **Protected Routes:** Frontend route guards to prevent unauthenticated access to the dashboard.
- **Responsive Design:** Fully styled with Tailwind CSS to work flawlessly on desktop and mobile.

---

## 🛠️ Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- React Router DOM
- Context API (Global State)
- Axios & Lucide React (Icons)

**Backend:**

- Node.js & Express
- MySQL2 (with connection pooling & SSL)
- JSON Web Token (JWT)
- N-Tier Architecture (Controllers, Services, Repositories)

**Infrastructure / Hosting:**

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Aiven (Cloud MySQL)

---

## 🚀 Local Setup Instructions

Want to run this project locally? Follow these steps:

### Prerequisites

- Node.js installed
- MySQL installed and running locally

### 1. Database Setup

1. Open your MySQL client (e.g., MySQL Workbench).
2. Create a new database: `CREATE DATABASE team_manager;`
3. Run the SQL scripts located in the `db_setup.sql` file (or mention where your schema is) to create the `users`, `projects`, and `tasks` tables.

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file and add your credentials (see Environment Variables below)
touch .env

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file
touch .env
# Add: VITE_BACKEND_API_URL=http://localhost:5000

# Start the Vite development server
npm run dev
```

### Environment Variables

To run this project, you will need to add the following environment variables to your respective .env files.

### Backend (.env)

```bash
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=team_manager
# If using a cloud database like Aiven, add: DB_PORT=12345
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend (.env)

```bash
VITE_BACKEND_API_URL=http://localhost:5000
```

## 🏗️ Architecture Highlight

The backend strictly follows the Repository Pattern to separate business logic from database queries:

- `Routes` -> Handle HTTP methods and endpoints.

- `Controllers` -> Handle request/response payloads.

- `Services` -> Handle business logic and validation.

- `Repositories` -> Handle raw SQL queries to the database.
