const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { fork } = require('child_process');
const http = require('http');

let mainWindow;
let serverProcess;

// 等待后端服务就绪
function waitForServer(url, maxRetries = 30, interval = 500) {
  return new Promise((resolve, reject) => {
    let retries = 0;
    const check = () => {
      http.get(url, () => {
        resolve();
      }).on('error', () => {
        retries++;
        if (retries >= maxRetries) {
          reject(new Error('后端服务启动超时'));
        } else {
          setTimeout(check, interval);
        }
      });
    };
    check();
  });
}

async function createWindow() {
  const PORT = 3000;

  // 打包后 server 文件通过 asarUnpack 释放到真实文件系统
  // 以便 child_process.fork 能正常加载 native 模块（better-sqlite3）
  const serverPath = app.isPackaged
    ? path.join(process.resourcesPath, 'app.asar.unpacked', 'server', 'index.js')
    : path.join(__dirname, '..', 'server', 'index.js');

  // 启动 Express 后端（为 Electron 设置生产模式标志）
  serverProcess = fork(serverPath, [], {
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: 'pipe'
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`[服务器] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[服务器错误] ${data.toString().trim()}`);
  });

  // 等待后端启动完成
  try {
    await waitForServer(`http://127.0.0.1:${PORT}/api/health`);
    console.log('后端服务已就绪');
  } catch (err) {
    console.error('后端服务启动失败:', err.message);
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    title: '桥梁信息系统',
    icon: path.join(__dirname, '..', 'dist', 'favicon.svg')
  });

  // Express 已提供静态文件服务，直接加载
  mainWindow.loadURL(`http://127.0.0.1:${PORT}`);

  // 启动时最大化
  mainWindow.maximize();

  // 禁止在新窗口打开链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // 关闭窗口时终止后端进程
  mainWindow.on('closed', () => {
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
    }
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
