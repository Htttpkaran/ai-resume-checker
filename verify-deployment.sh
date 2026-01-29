#!/bin/bash
# Quick deployment verification script
# Run this after deployment to verify everything works

echo "🚀 AI Resume Checker - Deployment Verification"
echo "=============================================="
echo ""

# Check if environment variables are set
echo "📝 Checking environment variables..."
if [ -z "$BACKEND_URL" ]; then
  echo "⚠️  Please set BACKEND_URL environment variable"
  echo "   Example: export BACKEND_URL=https://your-backend.onrender.com"
  exit 1
fi

if [ -z "$FRONTEND_URL" ]; then
  echo "⚠️  Please set FRONTEND_URL environment variable"
  echo "   Example: export FRONTEND_URL=https://your-app.vercel.app"
  exit 1
fi

echo "✅ Environment variables set"
echo ""

# Test backend health
echo "🔍 Testing backend health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$BACKEND_URL/api/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n 1)
RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | head -n -1)

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Backend health check passed"
  echo "   Response: $RESPONSE_BODY"
else
  echo "❌ Backend health check failed (HTTP $HTTP_CODE)"
  echo "   Response: $RESPONSE_BODY"
  exit 1
fi
echo ""

# Test frontend
echo "🔍 Testing frontend..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")

if [ "$FRONTEND_RESPONSE" -eq 200 ]; then
  echo "✅ Frontend is accessible"
else
  echo "❌ Frontend not accessible (HTTP $FRONTEND_RESPONSE)"
  exit 1
fi
echo ""

# Summary
echo "=============================================="
echo "✅ All checks passed!"
echo ""
echo "🌐 Your app is live:"
echo "   Frontend: $FRONTEND_URL"
echo "   Backend:  $BACKEND_URL"
echo "   API:      $BACKEND_URL/api"
echo ""
echo "📊 Next steps:"
echo "   1. Open $FRONTEND_URL in your browser"
echo "   2. Upload a test resume"
echo "   3. Verify the analysis works"
echo "   4. Monitor logs in Render/Vercel dashboards"
echo ""
