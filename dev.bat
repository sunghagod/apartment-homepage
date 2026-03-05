@echo off
echo 개발 서버 시작 중...

:: Next.js 개발 서버 백그라운드 실행
start "" cmd /c "cd /d %~dp0 && npm run dev"

:: 서버 뜰 때까지 3초 대기
timeout /t 3 /nobreak >nul

:: 데스크탑 버전 (좌측)
start chrome --new-window --window-size=1280,900 --window-position=0,0 "http://localhost:3000"

:: 모바일 버전 (우측, 430px = iPhone 14 Pro)
timeout /t 1 /nobreak >nul
start chrome --new-window --window-size=430,900 --window-position=1285,0 "http://localhost:3000"

echo 완료! 데스크탑(1280px) + 모바일(430px) 창이 열렸습니다.
