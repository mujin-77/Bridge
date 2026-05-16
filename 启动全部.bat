@echo off
chcp 65001 >nul
title 桥梁信息系统 - 启动程序

echo ================================================
echo           桥梁信息系统 - 启动中...
echo ================================================
echo.

cd /d "%~dp0"

:: 检查后端依赖
if not exist "server\node_modules" (
    echo [1/4] 安装后端依赖...
    cd server
    call npm install
    cd ..
    echo.
)

:: 初始化数据库
if not exist "server\bridges.db" (
    echo [2/4] 初始化数据库...
    cd server
    node init-db.js
    cd ..
    echo.
)

:: 启动后端服务
echo [3/4] 启动后端服务...
start "后端服务" cmd /c "cd /d "%~dp0server" && node index.js"

:: 等待后端启动
echo 等待后端服务启动...
timeout /t 2 /nobreak >nul

:: 启动前端开发服务器
echo [4/4] 启动前端服务...
start "前端服务" cmd /c "npm run dev"

:: 启动 Electron
echo.
echo 正在启动桌面应用...
timeout /t 3 /nobreak >nul
npm run electron:dev

echo.
echo ================================================
echo            启动完成！
echo ================================================
pause
