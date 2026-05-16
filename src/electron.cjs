// Electron 主进程入口
/* eslint-env node */
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,   // 允许在渲染进程使用 Node
      contextIsolation: false  // 保证 Vue 可以正常运行
    }
  })

  // 加载打包后的前端页面
  win.loadFile(path.join(__dirname, '../dist/index.html'))

  // 可选：打开开发者工具
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})