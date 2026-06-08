# 中国桥梁数据可视化系统 — 面试复习材料（第3次）

**生成时间**: 2026-05-24 21:18

---

## 一、项目亮点（6项）

### 1. Electron + Vue 3 + Express + SQLite 全栈一体化
- 桌面应用通过 `child_process.fork` 内嵌 Express 后端，轮询 `/api/health` 确认就绪后加载前端
- 一套代码同时支持浏览器开发模式和 Windows 桌面发布（electron-builder 打包 portable exe）

### 2. ECharts 图表联动交互
- `Bridge.vue` 中折线图 + 饼图联动：hover 折线图某朝代 → 饼图自动切换到该朝代的桥型占比
- 核心实现：`updateAxisPointer` 事件 + `chart.setOption` 动态修改饼图 `encode.value`

### 3. 全国地图省份下钻
- 动态加载阿里 DataV GeoJSON，支持 全国 → 省份 → 城市 三级下钻
- 复杂地名匹配：处理简称/全称/自治州/市县后缀等多种格式差异

### 4. 前后端优雅降级
- 所有 Pinia action 采用 try-catch，API 失败自动降级到本地 mock JSON
- 应用在离线/后端不可用时仍可完整运行

### 5. 深色科技风 UI 与自定义组件库
- CSS `mask-composite` 实现卡片边框流动动画，hover 红色 glow 效果
- 封装 `StatCard`、`RingProgress`、`MiniLine`、`DataPanel` 等高复用可视化组件

### 6. 完整数据管理能力
- CRUD + 多条件筛选 + 分页 + Excel 导入导出（xlsx 库）
- SQLite 4 个索引优化查询，事务批量插入保证数据一致性

---

## 二、技术难点（5个）

### 难点 1：Electron 进程管理与后端就绪检测
- **挑战**：Electron 启动时必须等 Express 后端就绪才能加载页面
- **方案**：`waitForServer` 函数以 500ms 间隔轮询 `/api/health`，最多重试 30 次（15秒超时）
- **代码**：`electron/main.cjs:10-27`

### 难点 2：ECharts 多图表数据联动
- **挑战**：两个独立 ECharts 实例需要基于鼠标 hover 实现实时数据联动
- **方案**：监听 `updateAxisPointer` 获取当前朝代索引 → `setOption` 动态更新饼图 `encode.value` 和 `label.formatter`
- **代码**：`src/components/Charts/Bridge.vue:140-157`

### 难点 3：动态 GeoJSON 加载与地名匹配
- **挑战**：31 个省份地名格式不统一，GeoJSON 中的 name 与数据库 province 字段可能不一致
- **方案**：`provinceCodeMap` 映射表 + 多策略匹配（精确→去后缀→特殊映射表）
- **代码**：`src/store/map.js` + `src/store/bridge/state.js`

### 难点 4：Vite + Electron 构建兼容
- **挑战**：Vite ESM 与 Electron CJS 模块系统不兼容
- **方案**：Electron 入口使用 `.cjs` 扩展名；`asarUnpack` 解包 server 目录以支持 native 模块（better-sqlite3）；Vite proxy 代理 API

### 难点 5：前后端数据一致性
- **挑战**：mock JSON 与 SQLite 数据需要保持同步
- **方案**：后端提供完整 CRUD API，前端优先调 API；`init-db.js` 从 mock JSON 初始化数据库确保起点一致

---

## 三、常见面试问答（5题）

### Q1：为什么选 SQLite 而不是 MySQL？
**A**：本项目是 Electron 桌面单机应用，SQLite 零配置、零部署、嵌入式运行，不需要额外数据库服务进程。数据量级（~1000条）完全在 SQLite 舒适区内，better-sqlite3 同步 API 在 Electron 场景下性能优于异步驱动。

### Q2：Composition API 相比 Options API 的优势？
**A**：（1）逻辑复用更灵活，项目中的 `useNavigate` hook 替代了 mixins 的隐式依赖问题；（2）`<script setup>` 语法糖减少样板代码；（3）与 Pinia 组合式 store 风格统一，代码组织更清晰；（4）TypeScript 类型推导更自然。

### Q3：数据大屏的性能优化策略？
**A**：（1）ECharts `setOption(option, true)` 使用 notMerge 模式避免增量合并开销；（2）地图 GeoJSON 按需懒加载，只加载当前展示层级的区域；（3）CSS 动画优先使用 `transform`/`opacity` 触发 GPU 合成层；（4）大数据列表使用分页而非全量渲染。

### Q4：Electron 安全措施？
**A**：（1）`contextIsolation: true` 隔离渲染进程与 Node.js 上下文；（2）`nodeIntegration: false` 禁止渲染进程直接访问 Node API；（3）`setWindowOpenHandler` 拦截新窗口打开，重定向到系统浏览器；（4）关闭窗口时终止后端子进程防止资源泄露。

### Q5：项目错误处理策略？
**A**：三层容错机制：（1）Pinia action 中 try-catch 捕获 API 异常；（2）API 失败降级到本地 mock JSON；（3）地图数据加载失败显示默认提示。核心原则：**任何情况下应用都有可用数据展示**。

---

## 四、模拟面试问题（3题）

### 问题 1：ECharts 大数据量渲染优化
> Bridge.vue 中实现了折线图和饼图的联动。如果桥梁数据从几十条增长到上万条，你会如何优化 ECharts 渲染性能？请从数据采样、渲染模式、交互策略三个维度回答。

**参考要点**：
- 数据采样：`sampling: 'lttb'` 降采样算法，DataZoom 缩放时动态调整采样密度
- 渲染模式：`large: true` 开启大数据优化路径，考虑 `echarts-gl` WebGL 渲染
- 交互策略：虚拟滚动替代全量渲染，tooltip 使用 `dispatchAction` 异步更新避免卡顿

### 问题 2：Electron 应用进程崩溃恢复
> 当前架构中 Express 后端通过 fork 启动。如果后端进程意外 crash，会导致什么问题？你如何设计一个健壮的进程守护机制？

**参考要点**：
- 问题：前端白屏/接口超时，用户无法操作
- 方案：监听 `serverProcess.on('exit')` 事件，实现自动重启 + 指数退避重试
- 增强：`waitForServer` 超时后显示错误提示页而非白屏；增加 `app.on('before-quit')` 优雅退出；日志记录 crash 堆栈

### 问题 3：状态管理从单机到 SaaS 的演进
> 项目有 6 个独立 Pinia store，数据来源混合了 API 和本地 mock。如果要将系统改造为多人在线 SaaS 平台，状态管理架构需要做哪些调整？

**参考要点**：
- 数据源统一：移除 mock 降级逻辑，所有数据走后端 API
- 实时同步：引入 WebSocket 推送数据变更通知，Pinia action 订阅变更事件
- 乐观更新：本地先更新 UI → 后端确认 → 冲突回滚
- 权限控制：Store 层面增加基于角色的数据过滤
- 考虑引入 TanStack Query 替代手动缓存管理

---

## 五、复习自测清单

| # | 知识点 | 是否掌握 |
|---|--------|----------|
| 1 | Electron fork 启动 Express + 健康检查流程 | ☐ |
| 2 | ECharts updateAxisPointer 联动实现 | ☐ |
| 3 | GeoJSON 动态加载 + 地名匹配策略 | ☐ |
| 4 | Pinia try-catch 降级到 mock 的模式 | ☐ |
| 5 | CSS mask-composite 边框动画原理 | ☐ |
| 6 | SQLite 索引优化 + better-sqlite3 同步优势 | ☐ |
| 7 | Vite proxy 跨域原理 | ☐ |
| 8 | asarUnpack 解包 native 模块 | ☐ |

---

*下一次复习材料将在 2 小时后自动生成*
