# 📚 AI Resume Checker - Complete Documentation

**Full-Stack AI Resume Analysis Application**

Built with React, Node.js, Express, and Google Gemini AI

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Project Overview](#-project-overview)
3. [Architecture](#-architecture)
4. [Backend Setup](#-backend-setup)
5. [Frontend Setup](#-frontend-setup)
6. [API Documentation](#-api-documentation)
7. [Integration Guide](#-integration-guide)
8. [Tech Stack](#-tech-stack)
9. [Features](#-features)
10. [Project Structure](#-project-structure)
11. [Configuration](#-configuration)
12. [Troubleshooting](#-troubleshooting)
13. [Security](#-security)
14. [Deployment](#-deployment)

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ installed
- npm or yarn
- Google Gemini API key ([Get it free](https://makersuite.google.com/app/apikey))

### Setup in 3 Steps

**Step 1: Backend Setup**
```powershell
cd backend
npm install
```

Create `.env` file and add your API key:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=5242880
```

**Step 2: Frontend Setup**
```powershell
cd frontend
npm install
```

**Step 3: Run Both Services**

Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```
✅ Backend: http://localhost:5000

Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```
✅ Frontend: http://localhost:3000

**Open Application:** http://localhost:3000

---

## 📋 Project Overview

AI Resume Checker is a full-stack web application that analyzes resumes using Google's Gemini AI. It provides:

- **ATS Compatibility Scoring** - How well your resume parses through applicant tracking systems
- **Keyword Analysis** - Matches resume keywords against job role requirements
- **Strengths Identification** - Highlights strong points in your resume
- **Improvement Suggestions** - Actionable feedback to enhance your resume
- **Missing Keywords** - Keywords you should add for better ATS performance
- **Professional Tips** - Expert advice for resume optimization

### Use Cases
- Job seekers optimizing resumes for specific roles
- Career counselors providing resume feedback
- Recruiters evaluating resume quality
- Students preparing for job applications

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        USER JOURNEY                          │
└─────────────────────────────────────────────────────────────┘

1. User uploads resume (PDF/DOCX)
   ↓
2. User selects job role
   ↓
3. User clicks "Analyze Resume"
   ↓
4. FRONTEND: api.js sends POST request
   POST http://localhost:5000/api/analyze
   FormData: { resume: File, jobRole: "Software Engineer" }
   ↓
5. BACKEND: Processes request
   → Validates file (fileValidator.js)
   → Extracts text (textExtractor.js)
   → Calls Gemini AI (geminiService.js)
   → Parses response (jsonParser.js)
   ↓
6. BACKEND: Returns JSON
   {
     success: true,
     data: {
       score: 85,
       ats: 78,
       keywordMatch: 82,
       strengths: [...],
       improvements: [...],
       missingKeywords: [...],
       tips: [...]
     }
   }
   ↓
7. FRONTEND: Receives data
   ↓
8. FRONTEND: Navigates to Results page
   ↓
9. Results page displays analysis
```

### Technology Stack

**Frontend:**
- React 18 - UI library
- Vite - Build tool & dev server
- Tailwind CSS - Styling
- React Router - Navigation
- React Icons - Icon library

**Backend:**
- Node.js - Runtime
- Express - Web framework
- @google/genai - Official Gemini SDK
- Multer - File upload handling
- pdf-parse - PDF text extraction
- mammoth - DOCX text extraction
- dotenv - Environment variables
- CORS - Cross-origin resource sharing

**API:**
- Google Gemini AI (gemini-2.5-flash model)

---

## 🔧 Backend Setup

### Installation

```bash
cd backend
npm install
```

### Dependencies

```json
{
  "@google/genai": "^1.38.0",
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "pdf-parse": "^1.1.1",
  "mammoth": "^1.6.0",
  "dotenv": "^16.3.1"
}
```

### Environment Configuration

Create `.env` file:
```env
# Server Configuration
PORT=5000

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# CORS Configuration (Frontend URL)
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

### Project Structure

```
backend/
├── server.js                   # Main Express server
├── routes/
│   └── analyze.js             # Resume analysis route
├── services/
│   └── geminiService.js       # Gemini AI integration
├── utils/
│   ├── textExtractor.js       # PDF/DOCX extraction
│   └── jsonParser.js          # Response parsing
├── middleware/
│   └── fileValidator.js       # File validation
├── .env                       # Environment variables
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── package.json              # Dependencies
```

### Running the Backend

**Development Mode (auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "AI Resume Checker API is running",
  "timestamp": "2026-01-29T12:00:00.000Z"
}
```

---

## 🎨 Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.1",
  "react-icons": "^4.12.0"
}
```

### Project Structure

```
frontend/
├── src/
│   ├── main.jsx              # App entry point
│   ├── App.jsx               # Root component
│   ├── index.css             # Global styles
│   ├── pages/
│   │   ├── Home.jsx          # Upload & analyze page
│   │   └── Results.jsx       # Results dashboard
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── upload/
│   │   │   ├── UploadArea.jsx
│   │   │   └── JobRoleSelector.jsx
│   │   └── dashboard/
│   │       ├── CircularScoreMeter.jsx
│   │       ├── ProgressBar.jsx
│   │       ├── StrengthsCard.jsx
│   │       ├── ImprovementsCard.jsx
│   │       ├── KeywordSuggestions.jsx
│   │       └── ImprovementTips.jsx
│   ├── services/
│   │   └── api.js            # Backend API integration
│   └── utils/
│       └── helpers.js        # Helper functions
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### Running the Frontend

```bash
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Health Check
**GET** `/api/health`

Check if the backend server is running.

**Response:**
```json
{
  "status": "OK",
  "message": "AI Resume Checker API is running",
  "timestamp": "2026-01-29T12:00:00.000Z"
}
```

#### 2. Analyze Resume
**POST** `/api/analyze`

Analyze a resume for a specific job role.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `resume`: File (PDF or DOCX, max 5MB)
  - `jobRole`: String (e.g., "Software Engineer")

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "score": 85,
    "ats": 78,
    "keywordMatch": 82,
    "strengths": [
      "Strong technical skills section",
      "Quantified achievements with metrics",
      "Clear project descriptions"
    ],
    "improvements": [
      "Add more industry-specific keywords",
      "Include a professional summary",
      "Use action verbs consistently"
    ],
    "missingKeywords": [
      "Python",
      "AWS",
      "Agile",
      "Docker",
      "CI/CD"
    ],
    "tips": [
      "Use action verbs to start bullet points",
      "Tailor your resume to the job description",
      "Quantify your achievements with numbers"
    ]
  }
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request (invalid file, missing fields, file too large) |
| 401 | Unauthorized (invalid API key) |
| 404 | Not Found (invalid endpoint) |
| 429 | Too Many Requests (API rate limit exceeded) |
| 500 | Internal Server Error |

---

## 🔗 Integration Guide

### Frontend → Backend Communication

**File:** `frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const analyzeResume = async (resumeFile, jobRole) => {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobRole', jobRole);

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Failed to analyze resume');
  }

  return result.data;
};
```

### Data Flow

1. User uploads resume file
2. User selects job role
3. Frontend calls `analyzeResume(file, jobRole)`
4. Backend receives request
5. Backend validates file (PDF/DOCX, max 5MB)
6. Backend extracts text from file
7. Backend sends text + job role to Gemini AI
8. Gemini AI analyzes and returns structured JSON
9. Backend parses and validates response
10. Backend returns data to frontend
11. Frontend navigates to Results page
12. Results page displays analysis

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Purpose |
|------------|---------|
| React 18 | UI component library |
| Vite | Build tool & dev server |
| Tailwind CSS | Utility-first CSS framework |
| React Router | Client-side routing |
| React Icons | SVG icon library |

### Backend Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express | Web application framework |
| @google/genai | Official Google Gemini SDK |
| Multer | Multipart/form-data file uploads |
| pdf-parse | Extract text from PDF files |
| mammoth | Extract text from DOCX files |
| CORS | Enable cross-origin requests |
| dotenv | Environment variable management |

### AI/ML

| Service | Purpose |
|---------|---------|
| Google Gemini AI | LLM for resume analysis |
| Model: gemini-2.5-flash | Fast, efficient text generation |

---

## ✨ Features

### Resume Analysis Features

1. **Overall Score (0-100)**
   - Comprehensive quality assessment
   - Based on multiple factors
   - Easy-to-understand metric

2. **ATS Compatibility (0-100)**
   - Applicant Tracking System optimization score
   - Format and structure analysis
   - Parsing difficulty assessment

3. **Keyword Match (0-100)**
   - Job-role specific keyword analysis
   - Industry standard terminology
   - Relevance scoring

4. **Key Strengths**
   - Highlights strong points
   - Positive aspects of resume
   - What you're doing right

5. **Improvement Areas**
   - Actionable suggestions
   - Specific weaknesses identified
   - How to enhance resume

6. **Missing Keywords**
   - Industry-specific terms
   - Job role requirements
   - Skills to highlight

7. **Professional Tips**
   - Expert advice
   - Best practices
   - Resume optimization strategies

### User Experience Features

- **Drag & Drop Upload** - Easy file selection
- **Multiple File Formats** - PDF and DOCX support
- **Job Role Selection** - Dropdown with common roles
- **Real-time Validation** - Instant feedback on errors
- **Loading States** - Visual feedback during processing
- **Error Handling** - Clear, helpful error messages
- **Responsive Design** - Works on all devices
- **Tabbed Interface** - Organized results display
- **Visual Metrics** - Circular gauges and progress bars
- **Export Ready** - Results can be saved/printed

---

## 📁 Project Structure

```
ai-resume-checker/
├── backend/
│   ├── server.js                   # Express server entry
│   ├── routes/
│   │   └── analyze.js             # Analysis endpoint
│   ├── services/
│   │   └── geminiService.js       # AI integration
│   ├── utils/
│   │   ├── textExtractor.js       # File parsing
│   │   └── jsonParser.js          # Response validation
│   ├── middleware/
│   │   └── fileValidator.js       # Upload validation
│   ├── .env                       # Environment vars (not in git)
│   ├── .env.example              # Template
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Root component
│   │   ├── index.css             # Global styles
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Upload page
│   │   │   └── Results.jsx       # Results page
│   │   ├── components/
│   │   │   ├── common/           # Shared components
│   │   │   ├── upload/           # Upload components
│   │   │   └── dashboard/        # Result components
│   │   ├── services/
│   │   │   └── api.js            # API client
│   │   └── utils/
│   │       └── helpers.js        # Utilities
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── package.json                   # Root package (optional)
└── DOCUMENTATION.md              # This file
```

---

## ⚙️ Configuration

### Backend Configuration

**File:** `backend/.env`

```env
# Server Port
PORT=5000

# Google Gemini API Key
GEMINI_API_KEY=your_api_key_here

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

# Max file upload size (bytes)
MAX_FILE_SIZE=5242880  # 5MB
```

### Frontend Configuration

**File:** `frontend/vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

**API Configuration:**

File: `frontend/src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Port Configuration

| Service | Default Port | Configurable In |
|---------|-------------|-----------------|
| Frontend | 3000 | `vite.config.js` |
| Backend | 5000 | `backend/.env` |

**To change ports:**
1. Backend: Update `PORT` in `backend/.env`
2. Frontend: Update `server.port` in `vite.config.js`
3. Update `FRONTEND_URL` in `backend/.env`
4. Update `API_BASE_URL` in `frontend/src/services/api.js`

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Unable to connect to server"

**Problem:** Frontend can't reach backend

**Solutions:**
- Check backend is running: `http://localhost:5000/api/health`
- Verify backend port is 5000
- Check firewall settings
- Ensure no other app is using port 5000

**Check port usage:**
```powershell
netstat -ano | findstr :5000
```

#### 2. "Gemini API error (404): models/gemini-xxx not found"

**Problem:** Model not available for your API key

**Solutions:**
- Verify API key is correct
- Check API key has proper permissions
- Model availability varies by region
- Try using `gemini-2.5-flash` or `gemini-1.5-pro`

#### 3. "Invalid API key"

**Problem:** API key not configured or incorrect

**Solutions:**
- Get API key from: https://makersuite.google.com/app/apikey
- Add to `backend/.env`: `GEMINI_API_KEY=your_key`
- Restart backend server after adding key
- Ensure no spaces around the key

#### 4. "File upload failed"

**Problem:** File validation error

**Solutions:**
- Check file format (only PDF or DOCX)
- Check file size (max 5MB)
- Ensure file is not corrupted
- Try a different resume file

#### 5. "Resume appears to be empty"

**Problem:** Text extraction failed

**Solutions:**
- PDF may be image-based (scanned) - needs OCR
- DOCX file may be corrupted
- Try re-saving resume as PDF/DOCX
- Ensure resume has actual text content

#### 6. CORS Errors

**Problem:** Cross-origin request blocked

**Solutions:**
- Verify `FRONTEND_URL` in `backend/.env` matches frontend URL
- Check CORS configuration in `backend/server.js`
- Ensure both servers are running
- Clear browser cache

#### 7. "Data not rendering in Results page"

**Problem:** Component props mismatch

**Solutions:**
- Check browser console for errors
- Verify API response structure matches component expectations
- Refresh the page
- Clear browser cache

### Debug Mode

**Backend Logging:**

The backend logs all requests in the terminal:
```
📄 Analyzing resume for role: Software Engineer
📎 File: resume.pdf (application/pdf, 234.56 KB)
🔍 Extracting text from resume...
✅ Text extracted: 1234 characters
🤖 Sending to Gemini AI for analysis...
✅ AI analysis received
📊 Parsing AI response...
✅ Response parsed successfully
✨ Analysis complete!
```

**Frontend Debugging:**

Open browser DevTools (F12) and check:
1. **Console tab** - JavaScript errors
2. **Network tab** - API requests/responses
3. **React DevTools** - Component state

---

## 🔒 Security

### Best Practices

1. **API Key Protection**
   - ✅ Store in `.env` file
   - ✅ Never commit `.env` to git
   - ✅ Listed in `.gitignore`
   - ❌ Never expose in frontend code
   - ❌ Never commit to public repositories

2. **CORS Configuration**
   - ✅ Restrict to frontend origin only
   - ✅ Use environment variable for URL
   - ❌ Don't allow all origins (`*`) in production

3. **File Validation**
   - ✅ Validate file types (PDF/DOCX only)
   - ✅ Enforce file size limits (5MB max)
   - ✅ Sanitize file names
   - ✅ Check file content type

4. **Input Sanitization**
   - ✅ Validate job role input
   - ✅ Trim and sanitize user inputs
   - ✅ Validate data types

5. **Error Handling**
   - ✅ Don't expose sensitive errors to users
   - ✅ Log errors server-side only
   - ✅ Return generic error messages

### Production Security Checklist

- [ ] Use HTTPS in production
- [ ] Set up rate limiting
- [ ] Implement request logging
- [ ] Use helmet.js for Express security
- [ ] Enable security headers
- [ ] Set up monitoring and alerts
- [ ] Use environment-specific configurations
- [ ] Regular dependency updates
- [ ] Implement user authentication (if needed)

---

## 🚢 Deployment

**📘 Complete Deployment Guide: See [DEPLOYMENT.md](DEPLOYMENT.md)**

This project includes a comprehensive step-by-step deployment guide for:
- **Backend → Render**
- **Frontend → Vercel**

The guide includes configuration files, environment templates, and troubleshooting.

### Backend Deployment (Render)

**Recommended Platform: Render** (with complete guide in DEPLOYMENT.md)

Other compatible platforms:
- Railway
- Heroku
- AWS Elastic Beanstalk
- Google Cloud Run
- DigitalOcean App Platform

**Steps:**

1. **Prepare for deployment:**
```bash
cd backend
npm install --production
```

2. **Set environment variables on platform:**
```
GEMINI_API_KEY=your_production_key
FRONTEND_URL=https://your-frontend-domain.com
PORT=5000
MAX_FILE_SIZE=5242880
NODE_ENV=production
```

3. **Deploy:**
```bash
git push platform main
```

### Frontend Deployment

**Recommended Platforms:**
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- Cloudflare Pages

**Steps:**

1. **Build production bundle:**
```bash
cd frontend
npm run build
```

2. **Configure API URL (recommended via env):**

Create `frontend/.env`:
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

3. **Deploy `dist/` folder** to your platform

### Environment Variables

**Production Backend:**
```env
GEMINI_API_KEY=production_api_key
FRONTEND_URL=https://your-app.vercel.app
PORT=5000
NODE_ENV=production
```

**Production Frontend:**
```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

### Single-Server Deployment (Optional)

If you want one deployment (backend serving the built frontend):

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Ensure backend has `NODE_ENV=production` and deploy the whole repo.

The backend will serve the `frontend/dist` build and the API under `/api`.

### Post-Deployment

1. Test health endpoint: `https://your-api.com/api/health`
2. Test file upload with sample resume
3. Check error handling
4. Monitor API usage
5. Set up logging and analytics

**Quick Verification:**
```powershell
# Run verification script
.\verify-deployment.ps1
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment steps and [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for a complete checklist.

---

## 📊 API Usage & Limits

### Google Gemini API

**Free Tier:**
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day

**Rate Limiting:**

If you exceed limits, you'll receive:
```json
{
  "success": false,
  "error": "API rate limit exceeded. Please try again in a few moments."
}
```

**Best Practices:**
- Implement caching for repeated requests
- Add request queuing if needed
- Monitor usage in Google AI Studio
- Upgrade to paid tier for production

---

## 🧪 Testing

### Manual Testing

**Backend:**
```bash
# Health check
curl http://localhost:5000/api/health

# Resume analysis
curl -X POST http://localhost:5000/api/analyze \
  -F "resume=@sample-resume.pdf" \
  -F "jobRole=Software Engineer"
```

**Frontend:**
1. Open http://localhost:3000
2. Upload a test resume
3. Select a job role
4. Click "Analyze Resume"
5. Verify results display correctly

### Test Cases

1. **Valid PDF upload** ✅
2. **Valid DOCX upload** ✅
3. **Invalid file type** (should reject)
4. **File too large** (should reject)
5. **Empty job role** (should show error)
6. **Backend offline** (should show error)
7. **Network timeout** (should handle gracefully)

---

## 📝 Development Workflow

### Adding New Features

1. **Update Backend:**
   - Add/modify service logic
   - Update API response structure
   - Test with Postman/curl

2. **Update Frontend:**
   - Create/modify components
   - Update API service
   - Test in browser

3. **Update Documentation:**
   - Document new features
   - Update API docs
   - Add examples

### Code Style

**Backend:**
- Use CommonJS (`require/module.exports`)
- Add JSDoc comments
- Handle errors gracefully
- Log important actions

**Frontend:**
- Use functional components
- Add prop validation
- Use semantic HTML
- Follow React best practices

---

## 🎓 Learning Resources

### React
- [Official React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

### Node.js/Express
- [Express.js Guide](https://expressjs.com)
- [Node.js Docs](https://nodejs.org/docs)

### Google Gemini AI
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
- [Get API Key](https://makersuite.google.com/app/apikey)
- [Quickstart Guide](https://ai.google.dev/gemini-api/docs/quickstart)

---

## 🆘 Support

### Getting Help

1. **Check this documentation** for common issues
2. **Review error messages** in browser console
3. **Check backend logs** in terminal
4. **Verify configuration** files

### Common Commands

```powershell
# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check what's running on port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process on port (Windows)
taskkill /PID <PID> /F
```

---

## 📜 License

ISC License

---

## 👏 Credits

**Built with:**
- React - Facebook/Meta
- Vite - Evan You & team
- Tailwind CSS - Adam Wathan & team
- Express - TJ Holowaychuk & team
- Google Gemini AI - Google DeepMind

---

## 🎉 Success Checklist

- [ ] Backend health check returns OK
- [ ] Frontend loads without errors
- [ ] Can upload PDF resume
- [ ] Can upload DOCX resume
- [ ] Can select job role
- [ ] "Analyze Resume" button works
- [ ] Loading state shows during analysis
- [ ] Results page displays all data:
  - [ ] Overall score
  - [ ] ATS compatibility
  - [ ] Keyword match
  - [ ] Strengths list
  - [ ] Improvements list
  - [ ] Missing keywords
  - [ ] Professional tips
- [ ] All three tabs work (Overview, Detailed, ATS Insights)
- [ ] Can navigate back to home
- [ ] Can analyze another resume
- [ ] Error messages display properly

---

**🎊 Your AI Resume Checker is ready to use!**

For questions or issues, refer to the troubleshooting section or check the error logs.

**Last Updated:** January 29, 2026
