/**
 * 检查数据库状态，如果缺少表则创建
 */

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'bridges.db');
console.log('数据库路径:', dbPath);

// 检查数据库文件是否存在
if (!fs.existsSync(dbPath)) {
  console.log('❌ 数据库文件不存在，将创建新数据库');
}

const db = new Database(dbPath);

try {
  // 检查 bridges 表是否存在
  const tableExists = db.prepare(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='bridges'"
  ).get();
  
  if (!tableExists) {
    console.log('⚠️  bridges 表不存在，正在创建...');
    
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
      )
    `);
    
    // 创建索引
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_dynasty ON bridges(dynasty);
      CREATE INDEX IF NOT EXISTS idx_province ON bridges(province);
      CREATE INDEX IF NOT EXISTS idx_material ON bridges(material);
      CREATE INDEX IF NOT EXISTS idx_technology ON bridges(technology);
    `);
    
    console.log('✅ bridges 表创建成功');
  } else {
    console.log('✅ bridges 表已存在');
  }
  
  // 显示当前状态
  const count = db.prepare('SELECT COUNT(*) as count FROM bridges').get().count;
  console.log(`📊 当前数据库中有 ${count} 条记录`);
  
  if (count > 0) {
    const maxId = db.prepare('SELECT MAX(id) as maxId FROM bridges').get().maxId;
    console.log(`📊 当前最大 ID: ${maxId}`);
  }
  
} catch (err) {
  console.error('❌ 错误:', err.message);
} finally {
  db.close();
  console.log('🔐 数据库连接已关闭');
}
