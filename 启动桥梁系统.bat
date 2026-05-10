@echo off
chcp 65001 >nul
title 中国桥梁数据可视化系统

echo.
echo ============================================
echo   中国桥梁数据可视化系统 - 启动程序
echo ============================================
echo.

set ROOT_DIR=%~dp0
cd /d "%ROOT_DIR%"

if not exist "dist" (
    echo [错误] 未找到dist目录！
    echo 请先运行 npm run build 进行打包
    pause
    exit /b 1
)

netstat -ano | findstr ":5173" >nul
if not errorlevel 1 (
    echo [提示] 端口5173已被占用
    echo 正在尝试关闭占用进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 2 >nul
)

echo [1/2] 正在启动本地服务器...
echo.

start "" "http://localhost:5173"

python -m http.server 5173 --directory dist

echo.
echo ============================================
echo   服务器已启动！
echo   请访问: http://localhost:5173
echo ============================================
echo.
pause
