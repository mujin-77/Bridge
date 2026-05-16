/**
 * 数据库初始化脚本
 * 将 mock/bridges.json 的数据导入 SQLite 数据库
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'bridges.db');
const mockDataPath = path.join(__dirname, '..', 'src', 'mock', 'bridges.json');

// 删除旧数据库
if (fs.existsSync(dbPath)) {
  try {
    fs.unlinkSync(dbPath);
    console.log('已删除旧数据库');
  } catch (err) {
    if (err.code === 'EBUSY') {
      console.error('数据库文件被占用，请先关闭所有使用该数据库的进程');
      console.error('可以运行: taskkill /f /im node.exe 强制关闭');
      process.exit(1);
    }
    throw err;
  }
}

// 创建新数据库
const db = new Database(dbPath);
console.log('数据库创建成功');

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS bridges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dynasty TEXT NOT NULL,
    year INTEGER,
    province TEXT,
    location TEXT,
    type TEXT,
    length REAL,
    span REAL,
    material TEXT,
    city TEXT,
    technology TEXT,
    description TEXT,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_dynasty ON bridges(dynasty);
  CREATE INDEX IF NOT EXISTS idx_province ON bridges(province);
  CREATE INDEX IF NOT EXISTS idx_material ON bridges(material);
  CREATE INDEX IF NOT EXISTS idx_technology ON bridges(technology);
`);

console.log('数据表创建成功');

// 读取 mock 数据
const bridgesData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));
console.log(`读取到 ${bridgesData.length} 条桥梁数据`);

// 插入数据
const insertStmt = db.prepare(`
  INSERT INTO bridges (name, dynasty, year, province, location, type, length, span, material, city, technology, description, image)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((bridges) => {
  for (const bridge of bridges) {
    insertStmt.run(
      bridge.name,
      bridge.dynasty,
      bridge.year || null,
      bridge.province || null,
      bridge.location || null,
      bridge.type || null,
      bridge.length || null,
      bridge.span || null,
      bridge.material || null,
      bridge.city || null,
      bridge.technology || null,
      bridge.description || null,
      bridge.image || null
    );
  }
});

insertMany(bridgesData);
console.log(`成功插入 ${bridgesData.length} 条数据`);

// 关闭数据库
db.close();
console.log('数据库连接已关闭');
console.log('数据库初始化完成！');
