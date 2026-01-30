@echo off
echo === Demarrage MOBILE (Back Symfony + React Native) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony serve"
start "React Native" cmd /k "cd /d ..\cesizen-frontmobile && npm run android"

echo === MOBILE lance ===