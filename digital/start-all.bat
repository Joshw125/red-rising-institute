@echo off
REM Start all services for tonight's multiplayer playtest.
REM Run this from digital/.

echo Building client...
call npm run build
if errorlevel 1 (
    echo Build failed.
    exit /b 1
)

echo Starting static server (port 4173)...
start "RR-Institute serve" cmd /k npx serve dist -l 4173 -s

echo Starting WebSocket server (port 3002)...
start "RR-Institute ws-server" cmd /k "cd server && npm start"

echo Starting client tunnel...
start "RR-Institute client tunnel" cmd /k npx localtunnel --port 4173 --subdomain redrising-institute

echo Starting server tunnel...
start "RR-Institute server tunnel" cmd /k npx localtunnel --port 3002 --subdomain redrising-server

echo.
echo All services starting in separate windows.
echo Game URL: https://redrising-institute.loca.lt
echo Server: wss://redrising-server.loca.lt
echo.
echo Tunnel password (one-time per visitor): 104.8.176.40
echo.
pause
