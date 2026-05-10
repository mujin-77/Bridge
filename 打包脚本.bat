@echo off
chcp 65001 >nul
echo ================================================
echo          🌉 桥梁信息系统 - 一键打包工具
echo ================================================
echo.

cd /d "%~dp0"

echo [1/4] 检查 Node.js 环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo ✅ Node.js 已安装

echo.
echo [2/4] 安装前端依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 安装依赖失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

echo.
echo [3/4] 打包前端...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 打包失败
    pause
    exit /b 1
)
echo ✅ 前端打包完成

echo.
echo [4/4] 复制文件到后端目录...
xcopy /E /I /Y dist\* ..\project-back\dist\ >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 复制文件失败
    pause
    exit /b 1
)
echo ✅ 文件已复制到后端目录

echo.
echo ================================================
echo          ✅ 打包完成！
echo ================================================
echo.
echo 📁 打包文件位置: ..\project-back\dist\
echo.
echo 启动项目：
echo   1. cd ..\project-back
echo   2. node app.js
echo.
echo 然后访问: http://localhost:3000
echo.
echo 按任意键退出...
pause >nul
