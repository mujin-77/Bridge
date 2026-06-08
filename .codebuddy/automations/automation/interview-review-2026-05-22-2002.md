# 中国桥梁数据可视化系统 — 面试复习材料

**生成时间**: 2026-05-22 20:02

---

## 一、项目亮点

### 1. 全栈一体化架构
- **Electron + Vue 3 + Express + SQLite** 四位一体，前端、后端、桌面打包全部打通
- Electron 通过 `child_process.fork` 内嵌 Express 服务，轮询健康检查确保后端就绪后才加载前端
- 一套代码同时支持浏览器开发模式和桌面应用发布

### 2. ECharts 图表联动交互
- `Bridge.vue` 折线图 + 饼图联动：鼠标 hover 折线图某朝代时，饼图自动切换显示该朝代的桥型分布
- 通过 `updateAxisPointer` 事件 + `chart.setOption` 动态 encode 实现

### 3. 全国地图省份下钻
- 动态加载阿里 DataV GeoJSON，支持 全国→省份→城市 三级下钻
- 复杂地名匹配：简称/全称/自治州/市县后缀多种策略

### 4. 前后端优雅降级
- 所有 Pinia action 采用 try-catch 模式，API 请求失败自动降级到本地 mock JSON
- 保证应用在离线/后端不可用情况下仍然可完整运行

### 5. 深色科技风 UI 设计
- 卡片边框流动动画（CSS mask-composite + keyframes）
- hover 红色 glow 效果、毛玻璃登录页、全局 Less 变量体系
- 自定义可复用可视化组件：StatCard、RingProgress、MiniLine、DataPanel

### 6. 数据管理能力
- 完整 CRUD + 搜索 + 分页
- Excel 导入导出（基于 xlsx 库）
- SQLite 数据库含 4 个索引优化查询性能

---

## 二、技术难点

### 难点 1：Electron 与 Express 进程通信
- **挑战**：Electron 启动时需先启动 Express 后端，再加载前端页面
- **方案**：`child_process.fork` 启动 Express，`waitForServer` 函数轮询 `/api/health` 端点，确认就绪后再 `mainWindow.loadURL()`
- **关键代码位置**：`electron/main.cjs`

### 难点 2：ECharts 多图表联动
- **挑战**：两张独立 ECharts 实例（折线图 + 饼图），需要在 hover 时实现数据联动
- **方案**：监听折线图的 `updateAxisPointer` 事件获取当前朝代索引，通过 `dispatchAction` + `setOption` 动态更新饼图数据源和颜色映射
- **关键代码位置**：`src/components/Charts/Bridge.vue`

### 难点 3：动态地图 GeoJSON 加载与地名匹配
- **挑战**：全国 31 个省份的地名格式不统一（简称/全称/自治州/带后缀）
- **方案**：实现多策略匹配函数，按优先级依次尝试精确匹配→去后缀匹配→特殊地名映射表
- **关键代码位置**：`src/store/map.js`

### 难点 4：Vite + Electron 构建集成
- **挑战**：Vite 开发服务器和 Electron 主进程的模块系统兼容（ESM vs CJS）
- **方案**：Electron 入口使用 `.cjs` 扩展名强制 CommonJS，Vite 配置 proxy 代理 API 请求到 Express 端口

### 难点 5：前后端数据一致性
- **挑战**：mock 数据与数据库数据需保持同步，防止增删改后数据不一致
- **方案**：后端提供真实 CRUD API，前端优先调用 API，仅在网络失败时降级 mock

---

## 三、常见面试问答

### Q1：为什么选择 SQLite 而不是 MySQL/PostgreSQL？
**A**：本项目定位为桌面端单机应用（Electron 打包），SQLite 零配置、零部署，嵌入式运行不需要额外数据库服务。512KB 的 bridges.db 足以满足数据规模，且 better-sqlite3 同步 API 比异步驱动更适合 Electron 主进程。

### Q2：Vue 3 Composition API 相比 Options API 的优势？
**A**：逻辑复用更灵活（自定义 hook 如 `useNavigate`），TypeScript 支持更好，setup 语法糖减少样板代码。项目中 Pinia store 也采用组合式写法，与组件层风格统一。

### Q3：如何处理大屏页面的性能优化？
**A**：
- ECharts 使用 `notMerge: true` 避免增量合并开销
- 地图 GeoJSON 按需懒加载（仅加载当前展示的省份）
- CSS 动画使用 `transform` 和 `opacity` 触发 GPU 加速（`will-change`）
- 大数据列表使用分页而非全量渲染

### Q4：Electron 应用的安全考虑？
**A**：
- `contextIsolation: true` 隔离渲染进程与 Node.js
- `nodeIntegration: false` 禁止渲染进程直接访问 Node API
- 通过 preload 脚本暴露有限的 IPC 接口

### Q5：项目中的错误处理策略是什么？
**A**：三层容错机制：
1. 前端 Pinia action 中 try-catch API 调用
2. API 失败降级到本地 mock JSON 数据
3. 地图数据加载失败显示默认提示
确保应用在任何情况下都有可用数据展示。

---

## 四、模拟面试问题

### 问题 1：ECharts 图表性能优化
> 你在 Bridge.vue 中实现了折线图和饼图的联动效果。如果数据量从几十条增加到上万条，会出现什么性能问题？你会如何优化？（提示：DataZoom、sampling、large 模式、WebGL 渲染）

### 问题 2：Electron 进程架构设计
> 项目使用 `child_process.fork` 在 Electron 主进程中启动 Express 后端。请分析这种架构的优缺点，以及如果后端 crash 了你会如何处理？（提示：进程守护、自动重启、健康检查、日志记录）

### 问题 3：前端状态管理架构
> 项目中使用了 6 个独立的 Pinia store，其中 bridge store 既有本地 mock 数据又有远程 API 调用。如果要把这个项目改造成多人协作的在线 SaaS 平台，Pinia 的状态管理需要做哪些调整？（提示：SSR 支持、乐观更新、冲突处理、实时同步）

---

## 五、本周复习重点建议

| 优先级 | 内容 | 理由 |
|--------|------|------|
| ⭐⭐⭐ | Bridge.vue 图表联动逻辑 | 核心亮点，必问 |
| ⭐⭐⭐ | Electron + Express 进程通信 | 架构难点，体现全栈能力 |
| ⭐⭐⭐ | 地图下钻 + 地名匹配算法 | 算法与业务结合 |
| ⭐⭐ | Pinia 多 store 设计 | 状态管理最佳实践 |
| ⭐⭐ | 前后端降级策略 | 工程化思维 |
| ⭐ | Excel 导入导出 | 常见业务需求 |

---

*下一条复习材料将在 2 小时后自动生成*
