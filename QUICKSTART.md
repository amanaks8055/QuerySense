# 🚀 QuerySense - Quick Deploy Guide

## Fastest Way to Get QuerySense Live (No Docker!)

### Option 1: Full Deployment (Production-Ready)

**Time: 15 minutes**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "QuerySense: AI SQL Assistant"
   git push
   ```

2. **Deploy Frontend to Netlify**
   - Go to https://netlify.com
   - "Import from Git" → Select repository
   - Base: `frontend`, Build: `npm run build`, Publish: `dist`
   - Deploy!

3. **Deploy Backend to Render**
   - Go to https://render.com
   - "New PostgreSQL" → Create database
   - "New Web Service" → Connect repo
   - Add environment variables (see NETLIFY_DEPLOYMENT.md)
   - Deploy!

**Result:** Live app with your own URL!

---

### Option 2: Demo with Play with Docker

**Time: 5 minutes**

1. Go to https://labs.play-with-docker.com
2. Clone your repo
3. Run `docker compose up`
4. Access via auto-generated URLs

**Result:** Temporary demo (4 hours)

---

### Option 3: Local Development (No Docker)

**Time: 10 minutes**

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:3000

**Database:** Use SQLite or online PostgreSQL

---

## 📊 Comparison

| Method | Time | Cost | Best For |
|--------|------|------|----------|
| Netlify + Render | 15 min | FREE | Production, Portfolio |
| Play with Docker | 5 min | FREE | Quick demos, Interviews |
| Local Dev | 10 min | FREE | Development, Testing |

---

## 🎯 Recommendation

**For Portfolio/Resume:** Use Option 1 (Netlify + Render)
- Permanent live link
- Professional domain
- Always available
- Free forever

---

## 📞 Need Help?

See detailed guides:
- **NETLIFY_DEPLOYMENT.md** - Full deployment steps
- **PLAY_WITH_DOCKER_GUIDE.md** - Online demo setup
- **README.md** - Project overview

---

**Choose your path and get QuerySense live! 🚀**
