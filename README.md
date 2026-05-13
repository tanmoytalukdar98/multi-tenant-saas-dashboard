# Multi-Tenant SaaS Dashboard 🚀

A modern **Multi-Tenant SaaS Dashboard** built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

This platform allows multiple organizations (tenants) to operate independently inside the same application while keeping their data fully isolated.

---

# 🧱 Tech Stack

## Frontend
- React.js
- Vite
- Material UI (MUI)
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- CORS

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/multi-tenant-saas-dashboard.git
cd multi-tenant-saas-dashboard
```

---

# 🔥 Backend Setup

## Install dependencies

```bash
cd backend
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/multitenant
JWT_SECRET=secret123
```

## Run backend

```bash
npm run dev
```

---

# 🎨 Frontend Setup

## Install dependencies

```bash
cd frontend
npm install
```

## Run frontend

```bash
npm run dev
```

---

# 🌐 Routes

## Login Route

```bash
/t/:tenant/login
```

Example:

```bash
/t/alpha/login
```

---

# 🧠 Multi-Tenant Flow

Tenant context is resolved from URL patterns:

```bash
/t/:tenant/...
```

This ensures:
- isolated users
- isolated projects
- isolated dashboard data
- tenant-specific branding support

---

# 🚀 Deployment

## Frontend
- Vercel

## Backend
- Railway / Render

---

# 👨‍💻 Authors

- Tanmoy Talukdar
- Arnav Srivastava

---

# 📜 License

This project is built for educational and learning purposes.
