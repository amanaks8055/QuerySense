# QuerySense Netlify Deployment Guide

## 🚀 Deploy QuerySense to Netlify (Frontend)

Since QuerySense is a full-stack app, we need to deploy frontend and backend separately.

---

## 📋 Deployment Architecture

```
Frontend (Netlify) → Backend (Render/Railway) → Database (PostgreSQL)
```

- **Frontend**: Netlify (Free tier)
- **Backend**: Render.com or Railway.app (Free tier)
- **Database**: Render PostgreSQL or Railway PostgreSQL (Free tier)

---

## Part 1: Deploy Frontend to Netlify

### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Push code to GitHub**
   ```bash
   cd "c:\Users\Aman sharma\Downloads\CRM PRO\DeployFllow\querysense"
   git init
   git add .
   git commit -m "Initial commit: QuerySense AI SQL Assistant"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/querysense.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your `querysense` repository
   - Configure build settings:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/dist`

3. **Add Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
   (Update this after deploying backend)

4. **Deploy!**
   - Click "Deploy site"
   - Your frontend will be live at `https://[random-name].netlify.app`

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   cd frontend
   npm install
   npm run build
   netlify deploy --prod
   ```

---

## Part 2: Deploy Backend to Render.com (Free)

### Step 1: Create Render Account

1. Go to https://render.com/
2. Sign up with GitHub (free)

### Step 2: Deploy PostgreSQL Database

1. In Render dashboard → "New" → "PostgreSQL"
2. Configure:
   - **Name**: `querysense-db`
   - **Database**: `querysense`
   - **User**: `postgres`
   - **Region**: Choose closest to you
   - **Plan**: Free
3. Click "Create Database"
4. **Save the connection details** (Internal Database URL)

### Step 3: Deploy Backend API

1. In Render dashboard → "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `querysense-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   DB_HOST=[from Render PostgreSQL - internal host]
   DB_PORT=5432
   DB_NAME=querysense
   DB_USER=postgres
   DB_PASSWORD=[from Render PostgreSQL]
   JWT_SECRET=your-secret-key-change-this
   OPENROUTER_API_KEY=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
   AI_MODEL=openai/gpt-3.5-turbo
   FRONTEND_URL=https://your-frontend.netlify.app
   ```

5. Click "Create Web Service"

### Step 4: Initialize Database

After backend deploys, run migrations:

1. In Render dashboard → Your service → "Shell"
2. Run:
   ```bash
   cd /opt/render/project/src
   psql $DATABASE_URL < ../database/init.sql
   psql $DATABASE_URL < ../database/seed.sql
   ```

---

## Part 3: Connect Frontend to Backend

1. **Get your backend URL** from Render (e.g., `https://querysense-api.onrender.com`)

2. **Update Netlify Environment Variable**:
   - Go to Netlify → Site settings → Environment variables
   - Set `VITE_API_URL` to your Render backend URL
   - Trigger a redeploy

3. **Update Backend CORS**:
   - In Render → Environment variables
   - Set `FRONTEND_URL` to your Netlify URL

---

## ✅ Final Setup

Your app is now live!

- **Frontend**: `https://[your-site].netlify.app`
- **Backend**: `https://[your-service].onrender.com`
- **Database**: Managed by Render

### Test It

1. Visit your Netlify URL
2. Login with: `demo@querysense.app` / `demo123`
3. Try a query: "Show me all customers from USA"

---

## 🎯 Alternative: Deploy Backend to Railway.app

Railway is another great free option:

1. Go to https://railway.app/
2. "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Node.js and PostgreSQL
5. Add environment variables
6. Deploy!

Railway provides:
- PostgreSQL database (free tier)
- Auto-deploys on git push
- Easy environment management

---

## 💰 Cost Breakdown (All FREE!)

| Service | What | Cost |
|---------|------|------|
| Netlify | Frontend hosting | $0 |
| Render | Backend + Database | $0 |
| OpenRouter | AI API | Pay per use (~$0.01/query) |

**Free tier limits:**
- Netlify: 100GB bandwidth/month
- Render: 750 hours/month (enough for 24/7)
- PostgreSQL: 1GB storage (plenty for demo)

---

## 🚨 Important Notes

### Render Free Tier

- Services **sleep after 15 minutes** of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Perfect for demos and portfolios
- Upgrade to paid ($7/month) for always-on

### Keeping Backend Awake

Add to your `README.md`:
```
⚠️ Note: Backend may take 30 seconds to wake from sleep on first request.
This is normal for free tier hosting.
```

Or use a service like **UptimeRobot** to ping your backend every 14 minutes.

---

## 📝 Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Deploy database to Render
- [ ] Deploy backend to Render with env vars
- [ ] Initialize database with SQL scripts
- [ ] Deploy frontend to Netlify
- [ ] Update frontend env var with backend URL
- [ ] Update backend CORS with frontend URL
- [ ] Test the full flow
- [ ] Add custom domain (optional)

---

## 🎉 You're Live!

Share your live demo:
- 💼 **Portfolio**: Add to your resume
- 👔 **LinkedIn**: Post your project
- 📧 **Recruiters**: Send the live link
- 🎥 **Demo video**: Record using your live site

---

## 🔧 Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in Netlify env vars
- Verify backend is running on Render
- Check browser console for CORS errors

### Backend errors
- Check Render logs
- Verify all environment variables are set
- Ensure database is running

### Database connection failed
- Verify `DB_HOST`, `DB_PORT`, `DB_NAME` match Render PostgreSQL
- Check database is running
- Verify credentials

---

## 🚀 Next Steps

1. **Custom Domain**: Add your own domain to Netlify (free)
2. **Monitoring**: Set up UptimeRobot for backend
3. **Analytics**: Add Netlify Analytics
4. **CI/CD**: Auto-deploy on git push (already setup!)

**Your QuerySense project is now production-ready and live! 🎉**
