const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');

// 获取静态文件目录 - 打包后指向可执行文件同级目录
const ROOT_DIR = path.dirname(process.execPath);
const STATIC_DIR = ROOT_DIR;

const PORT = 3000;

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
  '.eot': 'application/vnd.ms-fontobject',
};

function serveStatic(req, res) {
  const parsedUrl = url.parse(req.url, true);
  let pathname = path.join(STATIC_DIR, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);

  // 安全检查
  if (!path.normalize(pathname).startsWith(STATIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(pathname, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(STATIC_DIR, 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end('Not Found: ' + parsedUrl.pathname);
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + err.message);
      }
      return;
    }

    const ext = path.extname(pathname).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

// 自动打开浏览器
function openBrowser() {
  const browser = process.platform === 'win32' ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
  setTimeout(() => {
    exec(`${browser} http://localhost:${PORT}`);
  }, 1500);
}

// 创建服务器
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('==========================================');
  console.log('       桥梁信息系统已启动！');
  console.log('==========================================');
  console.log('');
  console.log(`   请在浏览器中访问：`);
  console.log(`   http://localhost:${PORT}`);
  console.log('');
  console.log('   关闭此窗口可停止服务器');
  console.log('==========================================');
  console.log('');
  openBrowser();
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});
