# 🚀 Production Deployment Guide - Render + Vercel

Complete step-by-step guide to deploy your AI Resume Checker to production.

**Stack:**
- Frontend → Vercel
- Backend → Render
- AI → Google Gemini API

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] GitHub repository with your code
- [ ] Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- [ ] Render account ([render.com](https://render.com))
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] All dependencies installed and tested locally
- [ ] `.env` files not committed to Git (check `.gitignore`)

---

## 🔧 Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend

Your backend is already configured. Verify these files:

**backend/package.json** - Must have:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**backend/.gitignore** - Must include:
```
node_modules/
.env
*.log
```

### Step 2: Push to GitHub

If not already done:
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### Step 3: Deploy to Render

1. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Click "Connect GitHub"
   - Select your `ai-resume-checker` repository
   - Click "Connect"

3. **Configure Service**

   | Setting | Value |
   |---------|-------|
   | **Name** | `ai-resume-checker-backend` |
   | **Region** | Choose closest to your users |
   | **Branch** | `main` |
   | **Root Directory** | `backend` |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free (or paid for better performance) |

4. **Add Environment Variables**

   Click "Advanced" → "Add Environment Variable"

   Add these variables:

   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   FRONTEND_URL=https://ai-resume-checker.vercel.app
   PORT=5000
   MAX_FILE_SIZE=5242880
   NODE_ENV=production
   ```

   **Important Notes:**
   - Replace `GEMINI_API_KEY` with your actual key
   - `FRONTEND_URL` will be updated after Vercel deployment (Step 2)
   - For now, use a placeholder or leave it empty

5. **Create Web Service**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Wait 2-5 minutes for deployment

6. **Get Your Backend URL**
   
   Once deployed, you'll see:
   ```
   https://ai-resume-checker-backend.onrender.com
   ```
   
   **Copy this URL** - you'll need it for frontend deployment.

7. **Test Backend**

   Test health endpoint in your browser or with curl:
   ```
   https://ai-resume-checker-backend.onrender.com/api/health
   ```

   Expected response:
   ```json
   {
     "status": "OK",
     "message": "AI Resume Checker API is running",
     "timestamp": "2026-01-30T12:00:00.000Z"
   }
   ```

---

## 🎨 Part 2: Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"

2. **Import Repository**
   - Click "Import Git Repository"
   - Select your `ai-resume-checker` repository
   - Click "Import"

3. **Configure Project**

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Vite |
   | **Root Directory** | `frontend` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |
   | **Install Command** | `npm install` |

4. **Add Environment Variable**

   Click "Environment Variables" section

   Add:
   ```
   Name: VITE_API_BASE_URL
   Value: https://ai-resume-checker-backend.onrender.com/api
   ```

   **Replace with your actual Render backend URL from Part 1**

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build
   - Vercel will provide your live URL

6. **Get Your Frontend URL**
   
   Once deployed:
   ```
   https://ai-resume-checker.vercel.app
   ```
   
   **Copy this URL**

### Step 2: Update Backend CORS

Now that you have your Vercel URL, update Render backend:

1. Go to Render Dashboard → Your Web Service
2. Click "Environment" tab
3. Find `FRONTEND_URL` variable
4. Update to your actual Vercel URL:
   ```
   https://ai-resume-checker.vercel.app
   ```
5. Click "Save Changes"
6. Render will automatically redeploy

---

## ✅ Part 3: Final Testing

### Test Complete Flow

1. **Open your live app:**
   ```
   https://ai-resume-checker.vercel.app
   ```

2. **Upload a test resume:**
   - Use a PDF or DOCX file
   - Select a job role
   - Click "Analyze Resume"

3. **Verify results:**
   - Score displays correctly
   - Strengths show up
   - Improvements listed
   - Keywords suggested

4. **Check Network:**
   - Open browser DevTools → Network tab
   - Verify API calls go to your Render backend
   - Check for CORS errors (should be none)

### Common Issues & Fixes

**CORS Error:**
- Double-check `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include `https://` protocol
- No trailing slash

**API Not Found (404):**
- Verify `VITE_API_BASE_URL` ends with `/api`
- Example: `https://your-backend.onrender.com/api`

**File Upload Fails:**
- Check file size is under 5MB
- Verify file is PDF or DOCX

**AI Analysis Fails:**
- Check `GEMINI_API_KEY` is set correctly in Render
- Verify API key is active in Google AI Studio

---

## 🔒 Part 4: Security & Best Practices

### Security Checklist

- [x] HTTPS enabled (automatic on Render/Vercel)
- [x] CORS restricted to frontend URL
- [x] Environment variables not in Git
- [x] File size limits enforced
- [x] File type validation active
- [x] API key not exposed to frontend

### Performance Tips

**Backend (Render):**
- Free tier sleeps after inactivity (30s cold start)
- Upgrade to paid tier for always-on service
- Monitor API usage to stay within Gemini limits

**Frontend (Vercel):**
- Already optimized with Vite build
- Automatic CDN distribution
- Fast global loading

### Monitoring

**Render:**
- Dashboard → Your Service → Logs
- Monitor API errors and response times

**Vercel:**
- Dashboard → Your Project → Analytics
- Track page views and load times

**Google AI Studio:**
- [aistudio.google.com](https://aistudio.google.com)
- Monitor Gemini API usage and limits

---

## 🔄 Updating Your App

### Update Backend

```bash
# Make changes to backend code
git add backend/
git commit -m "Update backend feature"
git push origin main
```

Render automatically redeploys on push.

### Update Frontend

```bash
# Make changes to frontend code
git add frontend/
git commit -m "Update UI component"
git push origin main
```

Vercel automatically redeploys on push.

### Update Environment Variables

**Render:**
1. Dashboard → Your Service → Environment
2. Update variable
3. Save (triggers redeploy)

**Vercel:**
1. Dashboard → Your Project → Settings → Environment Variables
2. Update variable
3. Save
4. Manually redeploy from Deployments tab

---

## 📊 API Rate Limits

### Google Gemini Free Tier

- **15 requests per minute**
- **1,500 requests per day**
- **1 million tokens per day**

### What Happens When Limit Reached?

Your app returns:
```json
{
  "success": false,
  "error": "API rate limit exceeded. Please try again in a few moments."
}
```

### Upgrade Options

If you need more:
- Upgrade to Gemini paid tier in Google AI Studio
- Implement request queuing
- Add caching for repeated analyses

---

## 📱 Share Your App

Your app is now live! Share it:

```
🌐 Live App: https://ai-resume-checker.vercel.app
📚 GitHub: https://github.com/yourusername/ai-resume-checker
```

---

## 🆘 Troubleshooting Guide

### Backend Won't Start

**Error:** "Application failed to respond"

**Fix:**
1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure `npm start` runs locally
4. Check `PORT` is set to `5000`

### Frontend Can't Connect to Backend

**Error:** "Unable to connect to server"

**Fix:**
1. Verify backend is running (check health endpoint)
2. Check `VITE_API_BASE_URL` is correct
3. Ensure no trailing slash in API URL
4. Check for CORS errors in browser console

### Gemini API Errors

**Error:** "Gemini API key invalid"

**Fix:**
1. Verify key in Render environment variables
2. Check key is active in Google AI Studio
3. Ensure no extra spaces in key

### Build Failures

**Render Build Error:**
- Check `backend/package.json` has all dependencies
- Verify Node version compatibility
- Check Render build logs

**Vercel Build Error:**
- Check `frontend/package.json` has all dependencies
- Verify Vite configuration
- Check Vercel build logs

---

## 🎉 Success!

Your AI Resume Checker is now live in production!

**Live URLs:**
- Frontend: `https://ai-resume-checker.vercel.app`
- Backend: `https://ai-resume-checker-backend.onrender.com`
- API Health: `https://ai-resume-checker-backend.onrender.com/api/health`

---

## 📞 Support Resources

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Gemini API:** [ai.google.dev](https://ai.google.dev)
- **Your Documentation:** See `DOCUMENTATION.md` for full technical details

---

**Last Updated:** January 30, 2026
