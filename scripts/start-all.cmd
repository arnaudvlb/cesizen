@echo off
echo === Demarrage COMPLET (Back + Front + Mobile) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony serve"
start "React Front"  cmd /k "cd /d ..\cesizen-frontweb && npm start"
start "React Native" cmd /k "cd /d ..\cesizen-frontmobile && npm run android"

echo === TOUT EST LANCE ===