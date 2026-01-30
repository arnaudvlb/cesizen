@echo off
echo === Demarrage WEB (Back Symfony + Front React) ===

cd /d "%~dp0"

start "Symfony Back" cmd /k "cd /d ..\cesizen-api && symfony serve"
start "React Front"  cmd /k "cd /d ..\cesizen-frontweb && npm start"

echo === WEB lance ===