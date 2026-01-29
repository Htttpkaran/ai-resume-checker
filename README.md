# AI Resume Checker

**Full-Stack AI Resume Analysis Application**

Built with React, Node.js, Express, and Google Gemini AI

---

## 🎯 Features

- **ATS Compatibility Scoring** - Analyze how well resumes parse through applicant tracking systems
- **Keyword Analysis** - Match resume keywords against job role requirements
- **Strengths & Improvements** - Get actionable feedback to enhance resumes
- **Missing Keywords** - Discover keywords to add for better ATS performance
- **Professional Tips** - Receive expert advice for resume optimization

---

## 🚀 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, Multer, Google Gemini AI  
**Deployment:** Vercel (Frontend) + Render (Backend)

---

## 📦 Quick Start

### Prerequisites
- Node.js v14+
- Google Gemini API key ([Get it free](https://makersuite.google.com/app/apikey))

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

Start backend:
```bash
npm run dev
```
✅ Backend: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
✅ Frontend: http://localhost:3000

---

## 🚢 Production Deployment

**Quick steps:**
1. Deploy backend to Render (`backend/` folder)
2. Deploy frontend to Vercel (`frontend/` folder)
3. Update backend CORS with your frontend URL

---

## 🛠️ Project Structure

```
ai-resume-checker/
├── backend/              # Node.js + Express API
│   ├── server.js
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── utils/
├── frontend/             # React + Vite app
│   └── src/
│       ├── pages/
│       ├── components/
│       └── services/
└── README.md             # Project overview
```

---

## 🔒 Security

- HTTPS enabled (automatic on Render/Vercel)
- CORS restricted to frontend URL
- File size limits enforced (5MB)
- File type validation (PDF/DOCX only)

---

## 🌐 Deployment Link

Frontend: https://ai-resume-checker-frontend.onrender.com

---

## 🌐 Live Demo

**Frontend:** https://ai-resume-checker-frontend.onrender.com  
**Backend API:** https://ai-resume-checker-backend-ru45.onrender.com/api  
**Health Check:** https://ai-resume-checker-backend-ru45.onrender.com/api/health

---

## 📝 License

ISC

---

**Made with ❤️ for better resumes**

