@echo off
echo === Demarrage WEB (Back Symfony + Front React) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony server:start"
start "React Front"  cmd /k "cd /d ..\cesizen-frontweb && npm run dev"

echo === WEB lance ===