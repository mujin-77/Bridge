/**
 * 桥梁信息系统 - Express 后端服务
 * 
 * 功能：
 * 1. 提供 RESTful API 接口
 * 2. 管理 SQLite 数据库
 * 3. 支持条件查询和统计分析
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

// 创建 Express 应用
const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库路径
const dbPath = path.join(__dirname, 'bridges.db');
let db;

// 初始化数据库连接
function initDatabase() {
  try {
    db = new Database(dbPath);
    console.log('数据库连接成功');
  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
}

// ==================== API 路由 ====================

/**
 * 获取所有桥梁列表
 * GET /api/bridges
 * Query: page, pageSize, search, dynasty, province, material, technology
 */
app.get('/api/bridges', (req, res) => {
  try {
    const { page = 1, pageSize = 100, search, dynasty, province, material, technology } = req.query;
    
    let whereClauses = [];
    let params = [];
    
    // 搜索条件
    if (search) {
      whereClauses.push('(name LIKE ? OR location LIKE ? OR dynasty LIKE ?)');
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }
    
    // 朝代筛选
    if (dynasty) {
      whereClauses.push('dynasty = ?');
      params.push(dynasty);
    }
    
    // 省份筛选
    if (province) {
      whereClauses.push('province = ?');
      params.push(province);
    }
    
    // 材料筛选
    if (material) {
      whereClauses.push('material = ?');
      params.push(material);
    }
    
    // 工艺筛选
    if (technology) {
      whereClauses.push('technology = ?');
      params.push(technology);
    }
    
    const whereSQL = whereClauses.length > 0 
      ? 'WHERE ' + whereClauses.join(' AND ') 
      : '';
    
    // 获取总数
    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM bridges ${whereSQL}`);
    const total = countStmt.get(...params).total;
    
    // 分页查询
    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const queryStmt = db.prepare(`
      SELECT * FROM bridges 
      ${whereSQL}
      ORDER BY id
      LIMIT ? OFFSET ?
    `);
    
    const bridges = queryStmt.all(...params, parseInt(pageSize), offset);
    
    res.json({
      code: 200,
      message: 'success',
      data: {
        list: bridges,
        total,
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        totalPages: Math.ceil(total / parseInt(pageSize))
      }
    });
  } catch (error) {
    console.error('查询桥梁列表失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 按朝代统计
 * GET /api/bridges/by-dynasty
 */
app.get('/api/bridges/by-dynasty', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT dynasty as name, COUNT(*) as value 
      FROM bridges 
      GROUP BY dynasty 
      ORDER BY value DESC
    `);
    const data = stmt.all();
    
    res.json({ code: 200, message: 'success', data });
  } catch (error) {
    console.error('按朝代统计失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 按省份统计
 * GET /api/bridges/by-province
 */
app.get('/api/bridges/by-province', (req, res) => {
  try {
    const { province } = req.query;
    
    let stmt;
    let data;
    
    if (province) {
      // 返回指定省份的桥梁列表
      stmt = db.prepare(`
        SELECT * FROM bridges 
        WHERE province = ? 
        ORDER BY year
      `);
      data = stmt.all(province);
    } else {
      // 返回省份统计
      stmt = db.prepare(`
        SELECT province as name, COUNT(*) as value 
        FROM bridges 
        GROUP BY province 
        ORDER BY value DESC
      `);
      data = stmt.all();
    }
    
    res.json({ code: 200, message: 'success', data });
  } catch (error) {
    console.error('按省份统计失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 按材料统计
 * GET /api/bridges/by-material
 */
app.get('/api/bridges/by-material', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT material as name, COUNT(*) as value 
      FROM bridges 
      GROUP BY material 
      ORDER BY value DESC
    `);
    const data = stmt.all();
    
    res.json({ code: 200, message: 'success', data });
  } catch (error) {
    console.error('按材料统计失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 按施工工艺统计
 * GET /api/bridges/by-technology
 */
app.get('/api/bridges/by-technology', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT technology as name, COUNT(*) as value 
      FROM bridges 
      GROUP BY technology 
      ORDER BY value DESC
    `);
    const data = stmt.all();
    
    res.json({ code: 200, message: 'success', data });
  } catch (error) {
    console.error('按施工工艺统计失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 获取桥梁详情
 * GET /api/bridges/:id
 */
app.get('/api/bridges/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM bridges WHERE id = ?');
    const bridge = stmt.get(id);
    
    if (bridge) {
      res.json({ code: 200, message: 'success', data: bridge });
    } else {
      res.status(404).json({ code: 404, message: '桥梁不存在', data: null });
    }
  } catch (error) {
    console.error('查询桥梁详情失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 添加桥梁
 * POST /api/bridges
 */
app.post('/api/bridges', (req, res) => {
  try {
    const { name, dynasty, year, province, location, type, length, span, material, city, technology, description, image } = req.body;
    
    const stmt = db.prepare(`
      INSERT INTO bridges (name, dynasty, year, province, location, type, length, span, material, city, technology, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(name, dynasty, year, province, location, type, length, span, material, city, technology, description, image);
    
    res.json({ 
      code: 200, 
      message: '添加成功', 
      data: { id: result.lastInsertRowid } 
    });
  } catch (error) {
    console.error('添加桥梁失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 更新桥梁
 * PUT /api/bridges/:id
 */
app.put('/api/bridges/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, dynasty, year, province, location, type, length, span, material, city, technology, description, image } = req.body;
    
    const stmt = db.prepare(`
      UPDATE bridges 
      SET name = ?, dynasty = ?, year = ?, province = ?, location = ?, type = ?, 
          length = ?, span = ?, material = ?, city = ?, technology = ?, description = ?, image = ?
      WHERE id = ?
    `);
    
    const result = stmt.run(name, dynasty, year, province, location, type, length, span, material, city, technology, description, image, id);
    
    if (result.changes > 0) {
      res.json({ code: 200, message: '更新成功', data: null });
    } else {
      res.status(404).json({ code: 404, message: '桥梁不存在', data: null });
    }
  } catch (error) {
    console.error('更新桥梁失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 删除桥梁
 * DELETE /api/bridges/:id
 */
app.delete('/api/bridges/:id', (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM bridges WHERE id = ?');
    const result = stmt.run(id);
    
    if (result.changes > 0) {
      res.json({ code: 200, message: '删除成功', data: null });
    } else {
      res.status(404).json({ code: 404, message: '桥梁不存在', data: null });
    }
  } catch (error) {
    console.error('删除桥梁失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 批量删除桥梁
 * POST /api/bridges/batch-delete
 */
app.post('/api/bridges/batch-delete', (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ code: 400, message: '请提供要删除的ID列表', data: null });
    }
    
    const placeholders = ids.map(() => '?').join(',');
    const stmt = db.prepare(`DELETE FROM bridges WHERE id IN (${placeholders})`);
    const result = stmt.run(...ids);
    
    res.json({ 
      code: 200, 
      message: `成功删除 ${result.changes} 条记录`, 
      data: { deleted: result.changes } 
    });
  } catch (error) {
    console.error('批量删除桥梁失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 导入数据
 * POST /api/bridges/import
 */
app.post('/api/bridges/import', (req, res) => {
  try {
    const { bridges } = req.body;
    
    if (!bridges || !Array.isArray(bridges) || bridges.length === 0) {
      return res.status(400).json({ code: 400, message: '请提供要导入的数据', data: null });
    }
    
    const stmt = db.prepare(`
      INSERT INTO bridges (name, dynasty, year, province, location, type, length, span, material, city, technology, description, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((items) => {
      let count = 0;
      for (const item of items) {
        stmt.run(
          item.name,
          item.dynasty,
          item.year || null,
          item.province || null,
          item.location || null,
          item.type || null,
          item.length || null,
          item.span || null,
          item.material || null,
          item.city || null,
          item.technology || null,
          item.description || null,
          item.image || null
        );
        count++;
      }
      return count;
    });
    
    const count = insertMany(bridges);
    
    res.json({ 
      code: 200, 
      message: `成功导入 ${count} 条数据`, 
      data: { imported: count } 
    });
  } catch (error) {
    console.error('导入数据失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 获取统计数据概览
 * GET /api/statistics/overview
 */
app.get('/api/statistics/overview', (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM bridges');
    const total = totalStmt.get().total;
    
    const dynastyStmt = db.prepare('SELECT COUNT(DISTINCT dynasty) as count FROM bridges');
    const dynastyCount = dynastyStmt.get().count;
    
    const provinceStmt = db.prepare('SELECT COUNT(DISTINCT province) as count FROM bridges WHERE province IS NOT NULL');
    const provinceCount = provinceStmt.get().count;
    
    const materialStmt = db.prepare('SELECT COUNT(DISTINCT material) as count FROM bridges WHERE material IS NOT NULL');
    const materialCount = materialStmt.get().count;
    
    res.json({
      code: 200,
      message: 'success',
      data: {
        total,
        dynastyCount,
        provinceCount,
        materialCount
      }
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({ code: 500, message: '服务器错误', data: null });
  }
});

/**
 * 健康检查
 * GET /api/health
 */
app.get('/api/health', (req, res) => {
  res.json({ code: 200, message: 'ok', timestamp: Date.now() });
});

// ==================== 启动服务器 ====================

// 初始化数据库
initDatabase();

// 启动服务器
app.listen(PORT, '127.0.0.1', () => {
  console.log('========================================');
  console.log('  桥梁信息系统后端服务已启动');
  console.log(`  访问地址: http://127.0.0.1:${PORT}`);
  console.log('========================================');
  console.log('可用接口:');
  console.log('  GET    /api/bridges              - 获取桥梁列表');
  console.log('  GET    /api/bridges/:id          - 获取桥梁详情');
  console.log('  GET    /api/bridges/by-dynasty    - 按朝代统计');
  console.log('  GET    /api/bridges/by-province   - 按省份统计');
  console.log('  GET    /api/bridges/by-material   - 按材料统计');
  console.log('  GET    /api/bridges/by-technology - 按工艺统计');
  console.log('  POST   /api/bridges               - 添加桥梁');
  console.log('  PUT    /api/bridges/:id           - 更新桥梁');
  console.log('  DELETE /api/bridges/:id           - 删除桥梁');
  console.log('  POST   /api/bridges/batch-delete  - 批量删除');
  console.log('  POST   /api/bridges/import        - 导入数据');
  console.log('  GET    /api/statistics/overview   - 统计概览');
  console.log('  GET    /api/health               - 健康检查');
  console.log('========================================');
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n正在关闭服务器...');
  if (db) {
    db.close();
    console.log('数据库连接已关闭');
  }
  process.exit(0);
});
