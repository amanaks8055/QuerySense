# 🚀 QuerySense - Complete Render Deployment Guide

## What You'll Get

- **Live URL**: `https://querysense.onrender.com`
- **Free Hosting**: Backend + Frontend + Database
- **Auto-Deploy**: Push to GitHub = Auto deploy
- **Total Time**: 20 minutes
- **Cost**: $0

---

## 📋 Prerequisites

- GitHub account (free)
- Render account (free - sign up with GitHub)
- Your OpenRouter API key (you have this)

---

## Part 1: Prepare Your Code (5 minutes)

### Step 1: Push to GitHub

Open terminal in your querysense folder:

```bash
cd "c:\Users\Aman sharma\Downloads\CRM PRO\DeployFllow\querysense"

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "QuerySense: AI-powered SQL assistant with real-time updates"

# Create GitHub repo (do this on github.com):
# 1. Go to github.com/new
# 2. Name: querysense
# 3. Public (for portfolio)
# 4. Don't initialize with README
# 5. Click "Create repository"

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/querysense.git
git branch -M main
git push -u origin main
```

**✅ Your code is now on GitHub!**

---

## Part 2: Deploy to Render (15 minutes)

### Step 1: Create Render Account (2 min)

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest)
4. Authorize Render to access your repositories

### Step 2: Deploy Database (3 min)

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**

2. **Configure Database:**
   - **Name**: `querysense-db`
   - **Database**: `querysense`
   - **User**: `querysense_user` (auto-generated)
   - **Region**: Choose closest to you (e.g., Oregon for US West)
   - **PostgreSQL Version**: 15
   - **Plan**: **Free**

3. Click **"Create Database"**

4. **IMPORTANT**: Save these connection details:
   - Internal Database URL (starts with `postgresql://`)
   - External Database URL
   - Host, Port, Database name, Username, Password

**Copy the Internal Database URL** - you'll need it for the backend!

### Step 3: Initialize Database (2 min)

Once the database is created:

1. Click on your database in Render dashboard
2. Scroll down to **"Connect"** section
3. Click **"PSQL Command"** to copy the connection command
4. In your local terminal, paste and run:

   ```bash
   # This connects to your Render database
   psql postgresql://querysense_user:[password]@[host]/querysense
   ```

5. In the PostgreSQL prompt, run your initialization scripts:

   ```sql
   -- Copy-paste the contents of database/init.sql
   -- Then copy-paste the contents of database/seed.sql
   ```

   Or use this command from your querysense folder:
   ```bash
   psql [your-connection-string] < database/init.sql
   psql [your-connection-string] < database/seed.sql
   ```

**✅ Database is ready with demo data!**

### Step 4: Deploy Backend (5 min)

1. In Render Dashboard, click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Click **"Build and deploy from a Git repository"**
   - Click **"Connect"** next to your `querysense` repository
   - If you don't see it, click **"Configure account"** to grant access

3. **Configure Service:**
   - **Name**: `querysense-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

4. **Add Environment Variables** (Click "Advanced"):
   
   Click **"Add Environment Variable"** for each:

   ```
   NODE_ENV=production
   PORT=3000
   
   # Database (from Step 2)
   DB_HOST=[get from Internal Database URL - the part after @]
   DB_PORT=5432
   DB_NAME=querysense
   DB_USER=querysense_user
   DB_PASSWORD=[from database connection details]
   
   # Or use the full URL:
   DATABASE_URL=[paste Internal Database URL from Step 2]
   
   # Security
   JWT_SECRET=querysense-super-secret-production-key-2024
   
   # OpenRouter API
   OPENROUTER_API_KEY=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
   AI_MODEL=openai/gpt-3.5-turbo
   
   # Frontend (will update this later)
   FRONTEND_URL=https://querysense.onrender.com
   ```

5. Click **"Create Web Service"**

6. **Wait for deployment** (~3-5 minutes)
   - You'll see build logs
   - Once complete, you'll get a URL like: `https://querysense-backend.onrender.com`

**✅ Backend is live!**

### Step 5: Deploy Frontend (3 min)

1. In Render Dashboard, click **"New +"** → **"Static Site"**

2. **Connect Repository:**
   - Select your `querysense` repository

3. **Configure Site:**
   - **Name**: `querysense`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variable:**
   - Click **"Advanced"**
   - Add:
     ```
     VITE_API_URL=https://querysense-backend.onrender.com
     ```
   (Use the URL from Step 4)

5. Click **"Create Static Site"**

6. **Wait for deployment** (~2-3 minutes)

**✅ Frontend is live!**

### Step 6: Update Backend CORS (1 min)

Now that you have your frontend URL:

1. Go back to your **Backend Web Service** in Render
2. Click **"Environment"** in left sidebar
3. Update `FRONTEND_URL` to your actual frontend URL:
   ```
   FRONTEND_URL=https://querysense.onrender.com
   ```
4. Backend will auto-redeploy

---

## 🎉 You're Live!

Your QuerySense app is now deployed!

- **Frontend**: `https://querysense.onrender.com`
- **Backend**: `https://querysense-backend.onrender.com`
- **Database**: Managed by Render

### Test It:

1. Visit your frontend URL
2. Login with: `demo@querysense.app` / `demo123`
3. Try: "Show me all customers from USA"
4. Watch the AI magic happen!

---

## 📝 Post-Deployment

### Custom Domain (Optional)

1. In Render dashboard → Your static site
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain (e.g., `querysense.yourdomain.com`)
4. Update DNS records as instructed
5. Free SSL included!

### Auto-Deploy

Already set up! When you push to GitHub:
```bash
git add .
git commit -m "Updated feature"
git push
```
Render auto-deploys both frontend and backend!

### Monitoring

1. **Logs**: Click on service → "Logs" tab
2. **Metrics**: See CPU, memory usage
3. **Events**: Deployment history

---

## ⚠️ Important Notes

### Free Tier Limitations

**Backend Service:**
- ✅ 750 hours/month (enough for 24/7)
- ⚠️ **Spins down after 15 min of inactivity**
- ⚠️ **First request takes ~30 seconds to wake**
- ✅ Unlimited requests when active

**Frontend:**
- ✅ 100 GB bandwidth/month
- ✅ Global CDN
- ✅ Always fast

**Database:**
- ✅ 1 GB storage
- ⚠️ **Expires after 90 days of inactivity**
- ✅ Easy to extend

### Keeping Backend Awake

To avoid cold starts, use **UptimeRobot**:

1. Go to https://uptimerobot.com (free)
2. Create new monitor:
   - Type: HTTP(s)
   - URL: `https://querysense-backend.onrender.com/health`
   - Interval: 5 minutes
3. Render stays awake!

### Add to README

Add this badge to your GitHub README:

```markdown
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white)](https://querysense.onrender.com)

## 🚀 Live Demo
Visit the live application: [querysense.onrender.com](https://querysense.onrender.com)

**Note**: Backend may take 30 seconds to wake from sleep on first request (free tier limitation).
```

---

## 🔧 Troubleshooting

### Backend Won't Start

**Check logs:**
1. Render Dashboard → Backend service → **"Logs"**
2. Look for errors

**Common issues:**
- Missing environment variables
- Database connection failed
- Build errors

**Solutions:**
- Verify all env vars are set
- Check DATABASE_URL is correct
- Ensure `npm run build` works locally

### Frontend Can't Connect to Backend

**Check:**
1. `VITE_API_URL` env var in frontend
2. `FRONTEND_URL` env var in backend
3. Backend is actually running (visit backend URL)

**Fix:**
- Update env vars
- Redeploy services

### Database Connection Errors

**Check:**
- Database is running (Render dashboard)
- Connection string is correct
- Database was initialized with SQL scripts

**Fix:**
- Re-run init.sql and seed.sql
- Verify credentials

---

## 📊 Cost Breakdown

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| **Backend** | 750 hrs/mo (sleeps) | $7/mo (always on) |
| **Frontend** | 100 GB/mo | $19/mo (more bandwidth) |
| **Database** | 1 GB, 90 days | $7/mo (persistent) |
| **Total** | **$0/mo** | $21-33/mo |

**For portfolio/resume**: Free tier is perfect!  
**For production app**: Consider paid tier

---

## 🎯 Next Steps

1. ✅ Add live link to resume
2. ✅ Update LinkedIn with project
3. ✅ Add to GitHub README
4. ✅ Share with recruiters
5. ✅ Record demo video

---

## 📞 Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Your QuerySense:**
- Backend logs in Render dashboard
- Check browser console for frontend errors
- Database logs in PostgreSQL service

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Database deployed and initialized
- [ ] Backend deployed with env vars
- [ ] Frontend deployed with VITE_API_URL
- [ ] Backend FRONTEND_URL updated
- [ ] App tested and working
- [ ] Custom domain added (optional)
- [ ] UptimeRobot monitoring (optional)
- [ ] README updated with live link

---

**Congratulations! 🎉 QuerySense is now live on Render!**

Share your link: `https://querysense.onrender.com`
