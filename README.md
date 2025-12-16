[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://querysense.onrender.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

# QuerySense 🧠

> AI-Powered Natural Language to SQL Query Assistant with Real-Time Insights

**Live Demo**: [querysense.onrender.com](https://querysense.onrender.com)

*Note: Backend may take 30 seconds to wake from sleep on first request (free tier)*

---

## 🎯 Overview

QuerySense is a modern full-stack web application that transforms natural language questions into SQL queries using AI, executes them safely on a PostgreSQL database, and provides intelligent business insights in real-time.

Perfect for demonstrating **full-stack development**, **AI integration**, **real-time features**, and **Docker deployment** skills.

---

## ✨ Key Features

- 🤖 **AI-Powered Query Generation** - OpenRouter API integration (GPT-4, Claude, Gemini support)
- 🔒 **Safe SQL Execution** - Sandboxed execution with validation and timeout protection
- ⚡ **Real-Time Updates** - WebSocket notifications throughout query lifecycle
- 📊 **Interactive Results** - Beautiful data tables with insights
- 💡 **Business Insights** - AI-generated actionable recommendations
- 👥 **Role-Based Access** - User and Admin roles with different permissions
- 📈 **Admin Dashboard** - System analytics and query monitoring
- 🎨 **Premium Dark UI** - Modern glassmorphism design with smooth animations
- 🐳 **Docker Ready** - Complete containerization with Docker Compose

---

## 🏗️ Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Framer Motion (animations)
- Socket.IO Client (real-time)
- Axios (HTTP)

### Backend
- Node.js + Express
- TypeScript
- Socket.IO (WebSocket server)
- PostgreSQL + pg
- JWT authentication
- bcrypt (password hashing)

### Infrastructure
- Docker + Docker Compose
- PostgreSQL 15
- Nginx (production)
- Render.com (deployment)

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/querysense.git
cd querysense

# Configure environment
cp .env.example .env
# Edit .env and add your OPENROUTER_API_KEY

# Launch with Docker
docker-compose up --build

# Access the app
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

### Option 2: Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev  # http://localhost:3000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev  # http://localhost:5173
```

---

## 🔑 Demo Credentials

**User Account:**
- Email: `demo@querysense.app`
- Password: `demo123`

**Admin Account:**
- Email: `admin@querysense.app`
- Password: `admin123`

---

## 💡 Example Queries

Try asking:
- "Show me all customers from USA"
- "What are the top 5 best-selling products?"
- "Calculate total revenue by product category"
- "List all pending orders from the last week"
- "Which customers haven't ordered in 30 days?"

---

## 📁 Project Structure

```
querysense/
├── backend/              # Express API server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── cont rollers/ # Route handlers
│   │   ├── middleware/  # Auth, validation
│   │   ├── models/      # TypeScript interfaces
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic (AI, SQL, WebSocket)
│   │   └── index.ts     # Server entry point
│   └── Dockerfile
├── frontend/            # React SPA
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main pages
│   │   ├── services/    # API, Socket.IO clients
│   │   └── styles/      # CSS design system
│   └── Dockerfile
├── database/
│   ├── init.sql        # Schema definition
│   └── seed.sql        # Demo data
└── docker-compose.yml  # Service orchestration
```

---

## 🔒 Security Features

- ✅ SQL injection prevention
- ✅ SELECT-only query execution
- ✅ Query timeout limits (10s)
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS protection
- ✅ Environment-based secrets

---

## 🌐 Deployment

See [RENDER_DEPLOYMENT_GUIDE.md](RENDER_DEPLOYMENT_GUIDE.md) for complete deployment instructions.

**Quick Deploy to Render:**
1. Push to GitHub
2. Create Render account
3. Deploy database, backend, frontend
4. Done! (~15 minutes)

**Alternative Options:**
- Play with Docker: [PWD_QUICKSTART.md](PWD_QUICKSTART.md)
- Netlify + Render: [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md)

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (protected)

### Queries
- `POST /api/query` - Submit new query (protected)
- `GET /api/query/history` - Get query history (protected)
- `GET /api/query/:id` - Get specific query (protected)

### Admin
- `GET /api/admin/analytics` - System analytics (admin only)
- `GET /api/admin/users` - All users (admin only)
- `GET /api/admin/queries` - All queries (admin only)

---

## 🎯 Skills Demonstrated

This project showcases:
- ✅ Full-stack TypeScript development
- ✅ AI/ML API integration
- ✅ Real-time WebSocket communication
- ✅ PostgreSQL database design
- ✅ RESTful API development
- ✅ Docker containerization
- ✅ Authentication & authorization
- ✅ Modern React patterns
- ✅ Production deployment
- ✅ Security best practices

---

## 📸 Screenshots

*Coming soon - deploy to Render first!*

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

---

## 📝 License

MIT License - Free to use for learning and portfolio purposes

---

## 👤 Author

**Your Name**
- GitHub: Aman Sharma

---

## 🙏 Acknowledgments

- OpenRouter for AI API access
- Render for free hosting
- PostgreSQL community
- React & Node.js ecosystems

---

**⭐ Star this repo if you found it helpful!**

Built with ❤️ for learning and demonstration
