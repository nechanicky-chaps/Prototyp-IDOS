@echo off
cd /d "%~dp0"
call pnpm run build
if errorlevel 1 goto :error
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0vytvorit-html.ps1"
if errorlevel 1 goto :error
start "" "%~dp0prototyp.html"
exit /b 0
:error
echo Sestaveni se nezdarilo.
pause
exit /b 1
