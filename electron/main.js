const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');
const url = require('url');

// 获取静态文件目录
const DIST_PATH = app.isPackaged 
  ? path.join(process.resourcesPath, 'dist')
  : path.join(__dirname, '..', 'dist');

// 简单静态服务器
function createServer(port) {
  const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'application/font-woff',
    '.woff2': 'application/font-woff2',
    '.ttf': 'application/font-ttf',
  };

  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      let filePath = path.join(DIST_PATH, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

      // 安全检查
      if (!path.normalize(filePath).startsWith(DIST_PATH)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          // 返回 index.html 支持 SPA 路由
          fs.readFile(path.join(DIST_PATH, 'index.html'), (err, data) => {
            res.writeHead(err ? 404 : 200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(err ? 'Not Found' : data);
          });
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(port, () => resolve(server));
  });
}

let mainWindow;
let server;

async function createWindow() {
  const PORT = 3000;
  server = await createServer(PORT);

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

  // 加载页面
  mainWindow.loadURL(`http://localhost:${PORT}`);

  // 启动时最大化
  mainWindow.maximize();

  // 禁止在新窗口打开链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // 关闭时停止服务器
  mainWindow.on('closed', () => {
    if (server) server.close();
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (server) server.close();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
