/**
 * 桥梁数据去重脚本
 * 保留较低 ID 的记录，删除较高 ID 的重复记录
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'mock', 'bridges.json');

// 读取数据
let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
console.log(`原始数据： ${data.length} 条记录`);

// 按名称去重，保留较低 ID 的记录
const seen = new Map(); // name -> lowest ID record
const duplicates = []; // 存储重复记录

data.forEach(bridge => {
  const name = bridge.name;
  if (seen.has(name)) {
    const existing = seen.get(name);
    if (bridge.id < existing.id) {
      // 当前记录的 ID 更低，保留当前记录
      duplicates.push(existing);
      seen.set(name, bridge);
    } else {
      // 当前记录的 ID 更高，删除当前记录
      duplicates.push(bridge);
    }
  } else {
    seen.set(name, bridge);
  }
});

// 获取去重后的数据
const uniqueData = Array.from(seen.values());

console.log(`重复记录数： ${duplicates.length}`);
console.log(`去重后数据： ${uniqueData.length} 条记录`);

// 显示被删除的重复记录
console.log('\n被删除的重复记录：');
duplicates.forEach(d => {
  console.log(`  - ${d.name} (ID: ${d.id})`);
});

// 按 ID 排序
uniqueData.sort((a, b) => a.id - b.id);

// 保存去重后的数据
fs.writeFileSync(dataPath, JSON.stringify(uniqueData, null, 2));
console.log(`\n去重完成！数据已保存到 ${dataPath}`);
