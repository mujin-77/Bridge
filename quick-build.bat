@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在打包，请耐心等待...
call npx vite build
if errorlevel 1 (
    echo Vite 构建失败
    pause
    exit /b 1
)
call npx electron-builder --win portable --config.electronDist=node_modules/electron/dist
if errorlevel 1 (
    echo Electron 打包失败
    pause
    exit /b 1
)
echo.
echo 打包完成！
pause
