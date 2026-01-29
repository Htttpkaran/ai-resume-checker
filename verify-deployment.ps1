# PowerShell deployment verification script
# Run this after deployment to verify everything works

Write-Host "🚀 AI Resume Checker - Deployment Verification" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if environment variables are set
Write-Host "📝 Checking URLs..." -ForegroundColor Yellow

$BACKEND_URL = Read-Host "Enter your Render backend URL (e.g., https://your-backend.onrender.com)"
$FRONTEND_URL = Read-Host "Enter your Vercel frontend URL (e.g., https://your-app.vercel.app)"

if ([string]::IsNullOrWhiteSpace($BACKEND_URL) -or [string]::IsNullOrWhiteSpace($FRONTEND_URL)) {
    Write-Host "❌ Both URLs are required" -ForegroundColor Red
    exit 1
}

Write-Host "✅ URLs provided" -ForegroundColor Green
Write-Host ""

# Test backend health
Write-Host "🔍 Testing backend health endpoint..." -ForegroundColor Yellow
try {
    $healthEndpoint = "$BACKEND_URL/api/health"
    $response = Invoke-RestMethod -Uri $healthEndpoint -Method Get -TimeoutSec 10
    
    if ($response.status -eq "OK") {
        Write-Host "✅ Backend health check passed" -ForegroundColor Green
        Write-Host "   Status: $($response.status)" -ForegroundColor Gray
        Write-Host "   Message: $($response.message)" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  Unexpected response from backend" -ForegroundColor Yellow
        Write-Host "   Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Backend health check failed" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    exit 1
}
Write-Host ""

# Test frontend
Write-Host "🔍 Testing frontend..." -ForegroundColor Yellow
try {
    $frontendResponse = Invoke-WebRequest -Uri $FRONTEND_URL -Method Get -TimeoutSec 10 -UseBasicParsing
    
    if ($frontendResponse.StatusCode -eq 200) {
        Write-Host "✅ Frontend is accessible" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Frontend returned status code: $($frontendResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Frontend not accessible" -ForegroundColor Red
    Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    exit 1
}
Write-Host ""

# Summary
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "✅ All checks passed!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Your app is live:" -ForegroundColor Cyan
Write-Host "   Frontend: $FRONTEND_URL" -ForegroundColor White
Write-Host "   Backend:  $BACKEND_URL" -ForegroundColor White
Write-Host "   API:      $BACKEND_URL/api" -ForegroundColor White
Write-Host ""
Write-Host "📊 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Open $FRONTEND_URL in your browser"
Write-Host "   2. Upload a test resume"
Write-Host "   3. Verify the analysis works"
Write-Host "   4. Monitor logs in Render/Vercel dashboards"
Write-Host ""
Write-Host "🎉 Deployment verification complete!" -ForegroundColor Green
