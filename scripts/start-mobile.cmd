@echo off
echo === Demarrage MOBILE (Back Symfony + React Native) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony serve --allow-all-ip"
start "React Native" cmd /k "cd /d ..\cesizen-frontmobile && npx expo start"

echo === MOBILE lance ===