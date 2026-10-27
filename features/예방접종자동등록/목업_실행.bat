@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js 가 필요합니다. https://nodejs.org 에서 LTS 설치 후 다시 실행해 주세요.
  pause
  exit /b 1
)

echo.
echo 목업 서버를 시작합니다...
echo 브라우저에서 http://localhost:8123/vims 를 열어 Vd-IMS 목업을 확인하세요.
echo.
start "" "http://localhost:8123/vims"
node mockup-server.js
pause
