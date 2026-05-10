const fs = require('fs');
const bridges = JSON.parse(fs.readFileSync('src/mock/bridges.json', 'utf8'));
const techs = ['沉井基础', '明挖扩大基础', '预制装配法', '桩基础', '悬臂施工法'];
const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥'];

const result = techs.map(tech => ({
  technology: tech,
  types: bridgeTypes.map(type => ({ type, count: 0 }))
}));

bridges.forEach(b => {
  const techIdx = techs.indexOf(b.technology);
  if (techIdx === -1) return;

  let category = '梁式桥';
  const t = b.type || '';
  if (t.includes('桁') || t.includes('钢架')) category = '刚架桥';
  else if (t.includes('梁')) category = '梁式桥';
  else if (t.includes('拱') || t.includes('石拱')) category = '拱式桥';
  else if (t.includes('悬索')) category = '悬索桥';
  else if (t.includes('斜拉')) category = '斜拉桥';
  else if (t.includes('浮') || t.includes('舟')) category = '浮桥';

  const typeIdx = bridgeTypes.indexOf(category);
  if (typeIdx !== -1) result[techIdx].types[typeIdx].count++;
});

fs.writeFileSync('src/mock/by-technology.json', JSON.stringify(result, null, 2));
console.log('Created by-technology.json with', result.length, 'technologies');
