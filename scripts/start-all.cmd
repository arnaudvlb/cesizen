@echo off
echo === Demarrage COMPLET (Back + Front + Mobile) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony serve --allow-all-ip"
start "React Front"  cmd /k "cd /d ..\cesizen-frontweb && npm run dev"
start "React Native" cmd /k "cd /d ..\cesizen-frontmobile && npx expo start"

echo === TOUT EST LANCE ===