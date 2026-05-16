@echo off
chcp 65001 >nul
title 桥梁信息系统 - 打包程序

cd /d "%~dp0"

echo ===========================================
echo    桥梁信息系统 - Electron 打包程序
echo ===========================================
echo.

:: 检查是否已构建
if not exist "dist\index.html" (
    echo [1/3] 正在构建前端项目...
    call npm run build
    if %errorlevel% neq 0 (
        echo [错误] 前端构建失败！
        pause
        exit /b 1
    )
    echo [完成] 前端构建完成
    echo.
)

echo [2/3] 正在打包 Electron 应用...
echo 请耐心等待，这可能需要几分钟...
echo.

:: 运行 electron-builder
call npx electron-builder --win portable --config.electronDist=node_modules/electron/dist

if %errorlevel% neq 0 (
    echo.
    echo [错误] Electron 打包失败！
    echo.
    echo 备选方案：请直接发送 dist 文件夹给朋友使用
    echo 朋友需要安装 Node.js：https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [3/3] 打包完成！
echo.

:: 检查输出文件
if exist "release\桥梁信息系统.exe" (
    echo ===========================================
    echo    打包成功！
    echo ===========================================
    echo.
    echo 生成的文件：release\桥梁信息系统.exe
    echo.
    echo 可以直接双击运行此 exe 文件！
    echo 无需安装任何环境！
    echo.
    echo 请将此文件发送给朋友即可使用。
    echo.
    explorer release
) else (
    echo [警告] 未找到生成的可执行文件
)

pause
