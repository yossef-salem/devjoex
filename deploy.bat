@echo off
echo 🚀 Deploying Portfolio to GitHub Pages...
echo.

echo 📝 Adding all files to git...
git add .

echo 💾 Committing changes...
git commit -m "Update portfolio for deployment"

echo 📤 Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Your portfolio will be available at:
echo    https://YOUR_USERNAME.github.io/devjoex
echo.
echo ⏰ Please wait 5-10 minutes for GitHub Pages to deploy.
echo.
pause
