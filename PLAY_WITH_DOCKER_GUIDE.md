# 🐳 QuerySense - Play with Docker Setup Guide

## Overview

This guide shows you how to **demo QuerySense online** using Play with Docker - no installation needed!

**Play with Docker** is a free online playground that gives you a Docker environment in your browser. Perfect for showcasing your project to recruiters, in interviews, or on portfolios.

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Access Play with Docker

1. Visit **https://labs.play-with-docker.com/**
2. Click **"Login"** (use your Docker Hub account or create one - it's free)
3. Click **"Start"** to create a new session
4. Click **"+ ADD NEW INSTANCE"** to get a terminal

You now have a Linux environment with Docker pre-installed! 🎉

### Step 2: Clone QuerySense

In the terminal, run:

```bash
git clone https://github.com/YOUR_USERNAME/querysense.git
cd querysense
```

*Note: If you haven't pushed to GitHub yet, use the alternative method below.*

### Step 3: Configure Environment

Create the `.env` file:

```bash
cat > .env << 'EOF'
DB_NAME=querysense
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=querysense-secret-key-2024
NODE_ENV=production
OPENROUTER_API_KEY=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
AI_MODEL=openai/gpt-3.5-turbo
FRONTEND_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000
EOF
```

### Step 4: Launch QuerySense

```bash
docker compose up --build -d
```

**What happens:**
- PostgreSQL database starts and initializes
- Backend builds (Node.js + TypeScript)
- Frontend builds (React + Vite)
- Takes ~3-5 minutes for first build

### Step 5: Check Services

```bash
docker compose ps
```

You should see 3 services running:
- ✅ `querysense-db` (PostgreSQL)
- ✅ `querysense-backend` (API)
- ✅ `querysense-frontend` (UI)

### Step 6: Access the Application

Play with Docker automatically creates URLs for exposed ports.

1. Look for port numbers at the top of the page (3000, 5173)
2. Click on **port 5173** to open the frontend
3. You'll see the QuerySense login page! 🎉

### Step 7: Demo the App

**Login credentials:**
- Email: `demo@querysense.app`
- Password: `demo123`

**Try these queries:**
- "Show me all customers from USA"
- "What are the top 5 best-selling products?"
- "Calculate total revenue by product category"

Watch the AI convert your questions to SQL, execute them, and provide insights!

---

## 🎯 Alternative: Without GitHub

If your code isn't on GitHub yet, use this method:

### Option A: Quick Upload

1. Create a GitHub repository and push your code
2. Use the Quick Start steps above

### Option B: Manual File Creation

In Play with Docker terminal:

```bash
# Create project structure
mkdir -p querysense/backend/src/{config,controllers,middleware,models,routes,services}
mkdir -p querysense/frontend/src/{components,pages,services,styles}
mkdir -p querysense/database

# Create docker-compose.yml
cat > querysense/docker-compose.yml << 'EOF'
[paste your docker-compose.yml content]
EOF

# Continue creating files...
```

*This is tedious - I recommend pushing to GitHub first!*

---

## 📊 Showcase Tips

### For Recruiters/Interviews

1. **Share the session URL**
   - Click the "Share" button in Play with Docker
   - Send the link (valid for 4 hours)
   - They can see your live demo!

2. **Walk through the architecture**
   ```bash
   # Show running containers
   docker compose ps
   
   # Show logs
   docker compose logs backend
   
   # Show database
   docker compose exec db psql -U postgres -d querysense -c "SELECT * FROM customers LIMIT 5;"
   ```

3. **Explain the Docker setup**
   - 3 services orchestrated
   - Multi-stage builds for optimization
   - Health checks and dependencies
   - Volume persistence

### Screenshots for Portfolio

1. **Architecture View**
   ```bash
   docker compose ps
   ```
   Take a screenshot showing all 3 services running

2. **Application Demo**
   - Login page
   - Query submission
   - Real-time SQL generation
   - Results table
   - AI insights

3. **Code Quality**
   ```bash
   cat docker-compose.yml
   cat backend/Dockerfile
   ```
   Show your Docker configuration

---

## 🎥 Recording a Demo

### Option 1: Screen Recording

Use **OBS**, **Loom**, or built-in screen recording to capture:

1. Opening Play with Docker
2. Running `docker compose up`
3. Services starting
4. Accessing the UI
5. Submitting queries
6. Showing results

### Option 2: Asciinema (Terminal Recording)

```bash
# Install asciinema
apk add asciinema

# Record your terminal
asciinema rec querysense-demo.cast

# Show docker setup
docker compose up -d
docker compose ps
docker compose logs

# Stop recording (Ctrl+D)
```

Upload to asciinema.org for shareable terminal recordings!

---

## 📝 Command Cheat Sheet

### Essential Commands

```bash
# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Restart a service
docker compose restart backend

# Execute commands in containers
docker compose exec backend sh
docker compose exec db psql -U postgres -d querysense

# View resource usage
docker stats
```

### Troubleshooting

```bash
# Check if services are healthy
docker compose ps

# View specific service logs
docker compose logs backend
docker compose logs frontend
docker compose logs db

# Rebuild from scratch
docker compose down -v
docker compose up --build
```

---

## 🌟 Session Management

**Important Notes:**

- ⏰ Play with Docker sessions last **4 hours**
- 🔄 Sessions are **temporary** (data is lost after timeout)
- 🔗 **Share links** expire with the session
- 💾 No persistent storage (perfect for demos!)

**Best Practices:**

1. **Start fresh** for each demo
2. **Prepare screenshots** beforehand
3. **Have backup plan** (recorded video)
4. **Test queries** before showing to recruiters

---

## 🎯 What to Highlight

### Technical Skills Demonstrated

1. **Docker Expertise**
   - Multi-container orchestration
   - Multi-stage builds
   - Health checks
   - Volume management
   - Network configuration

2. **Full-Stack Development**
   - TypeScript (backend & frontend)
   - Node.js/Express API
   - React with modern hooks
   - PostgreSQL database

3. **DevOps Knowledge**
   - Containerization
   - Environment configuration
   - Service dependencies
   - Production-ready setup

4. **AI Integration**
   - OpenRouter API
   - Natural language processing
   - Real-time updates

### Key Talking Points

- "I containerized the entire stack for consistent deployment"
- "Multi-stage builds reduce final image size by 60%"
- "Health checks ensure service reliability"
- "Volume persistence for database data"
- "One command deploys the entire application"

---

## 🚀 Next Steps

After Play with Docker demo:

1. **Push to GitHub** with comprehensive README
2. **Add Docker badges** to your repository
3. **Include architecture diagrams**
4. **Document the Docker setup** in detail
5. **Create a portfolio page** showcasing the project

---

## 📞 Support

If Play with Docker isn't working:

- **Alternative 1**: Use **Killercoda** (another online Docker playground)
- **Alternative 2**: Record a video demo
- **Alternative 3**: Use GitHub Codespaces
- **Alternative 4**: Create detailed documentation with screenshots

---

## ✅ Pre-Demo Checklist

Before showing to recruiters/interviews:

- [ ] Test the full flow on Play with Docker
- [ ] Prepare sample queries
- [ ] Take screenshots of key features
- [ ] Know your talking points
- [ ] Have docker-compose.yml ready to explain
- [ ] Understand the architecture
- [ ] Be ready to answer Docker questions

---

## 🎉 You're Ready!

QuerySense is now demo-ready without any local installation. Perfect for:

- 💼 **Job interviews**
- 📧 **Email to recruiters**
- 🖥️ **Portfolio websites**
- 🎓 **Technical presentations**
- 👥 **Peer reviews**

**Pro Tip:** Record a 2-minute demo video and upload to YouTube/Loom as backup!

---

**Good luck with your showcase! 🚀**
