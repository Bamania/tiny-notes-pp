@echo off
echo Starting development servers...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak > nul
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd Frontend && yarn run dev"
echo.
echo Both servers are starting. Check the new terminal windows.
pause