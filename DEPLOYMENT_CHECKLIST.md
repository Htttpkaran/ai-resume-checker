# 📋 Deployment Checklist

Use this checklist to ensure smooth deployment.

---

## Pre-Deployment

- [ ] Code tested locally and working
- [ ] All dependencies in `package.json`
- [ ] `.env` files not committed to Git
- [ ] `.gitignore` includes `node_modules/` and `.env`
- [ ] Google Gemini API key obtained
- [ ] GitHub repository created and pushed
- [ ] Render account created
- [ ] Vercel account created

---

## Backend Deployment (Render)

- [ ] Repository connected to Render
- [ ] Root directory set to `backend`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Environment variables set:
  - [ ] `GEMINI_API_KEY`
  - [ ] `FRONTEND_URL` (placeholder for now)
  - [ ] `PORT=5000`
  - [ ] `MAX_FILE_SIZE=5242880`
  - [ ] `NODE_ENV=production`
- [ ] Service deployed successfully
- [ ] Backend URL copied: `https://____________.onrender.com`
- [ ] Health endpoint tested: `https://____________.onrender.com/api/health`
- [ ] Returns `{"status": "OK"}`

---

## Frontend Deployment (Vercel)

- [ ] Repository imported to Vercel
- [ ] Framework preset: `Vite`
- [ ] Root directory set to `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable set:
  - [ ] `VITE_API_BASE_URL=https://your-backend.onrender.com/api`
- [ ] Project deployed successfully
- [ ] Frontend URL copied: `https://____________.vercel.app`
- [ ] App loads without errors

---

## CORS Configuration

- [ ] Returned to Render backend settings
- [ ] Updated `FRONTEND_URL` with actual Vercel URL
- [ ] Saved changes (triggers redeploy)
- [ ] Backend redeployed successfully

---

## End-to-End Testing

- [ ] Opened live frontend URL
- [ ] Uploaded test resume (PDF)
- [ ] Selected job role
- [ ] Clicked "Analyze Resume"
- [ ] Results displayed correctly:
  - [ ] Score visible
  - [ ] ATS score shown
  - [ ] Keyword match displayed
  - [ ] Strengths listed
  - [ ] Improvements shown
  - [ ] Missing keywords suggested
  - [ ] Tips displayed
- [ ] Checked browser console (no CORS errors)
- [ ] Tested with DOCX file
- [ ] Tested with different job roles

---

## Security & Performance

- [ ] HTTPS enabled (automatic)
- [ ] CORS properly configured
- [ ] API key not exposed in frontend
- [ ] File upload limits working
- [ ] Error messages user-friendly
- [ ] No sensitive data in logs

---

## Monitoring Setup

- [ ] Render logs accessible
- [ ] Vercel analytics enabled
- [ ] Google AI Studio usage visible
- [ ] Error tracking configured (optional)

---

## Documentation

- [ ] `DEPLOYMENT.md` reviewed
- [ ] Environment variables documented
- [ ] API URLs recorded
- [ ] Shared with team/stakeholders

---

## Post-Deployment

- [ ] App tested from different devices
- [ ] Tested from different networks
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Shared live URL
- [ ] Updated README with live link

---

## 🎉 Deployment Complete!

**Live URLs:**
- Frontend: `https://______________________.vercel.app`
- Backend: `https://______________________.onrender.com`
- API Health: `https://______________________.onrender.com/api/health`

**Next Steps:**
- Monitor API usage
- Gather user feedback
- Plan feature updates
- Consider paid tiers for production scale

---

**Date Deployed:** ____________________
**Deployed By:** ____________________
**Version:** 1.0.0
