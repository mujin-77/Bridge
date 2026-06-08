# 中国古桥梁数据可视化系统

> 基于 Vue 3 + ECharts + Express + Electron 的全栈数据可视化桌面应用，对中国古代至现代桥梁的地理分布、结构类型、工艺技术等维度进行交互式可视化分析。

---

## 项目概述

本项目是一个面向中国桥梁文化领域的数据可视化系统，涵盖 **数据大屏监控、全国地图省份下钻、桥梁结构对比分析、数据集 CRUD 管理** 等核心功能。采用前后端分离架构，通过 Electron 打包为 Windows 桌面应用，同时支持浏览器端独立运行。

**核心价值**：将分散的古桥梁工程数据聚合为可交互的可视化界面，支持多维度数据钻取与对比分析，为桥梁文化传播与工程研究提供直观的数据展示工具。

---

## 技术架构

```
┌─────────────────────────────────────────────────────────┐
│                    Electron 桌面应用                    │
│                                                         │
│  ┌────────────────────┐    ┌─────────────────────────┐  │
│  │   Vue 3 前端       │    │    Express 后端         │  │
│  │  ─────────────     │    │  ──────────────         │  │
│  │  Composition API   │    │  RESTful API            │  │
│  │  ECharts 6 可视化  │────│  SQLite + better-sqlite3│  │
│  │  Pinia 状态管理    │    │  CORS / 健康检查        │  │
│  │  Element Plus UI   │    │  :3000                  │  │
│  │  Vite :5173        │    │                         │  │
│  └────────────────────┘    └─────────────────────────┘  │
│           │                          │                  │
│           ▼                          ▼                  │
│  ┌────────────────────┐    ┌─────────────────────────┐  │
│  │  Pinia Store 层    │    │    SQLite 数据层        │  │
│  │  6 个独立 Store    │    │  bridges.db 单表设计    │  │
│  │  API 优先 + Mock   │    │  4 个查询索引           │  │
│  │  降级容错          │    │  事务批量写入           │  │
│  └────────────────────┘    └─────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

| 层次       | 技术选型                    | 版本 | 选型理由                                 |
| ---------- | --------------------------- | ---- | ---------------------------------------- |
| 前端框架   | Vue 3 + Composition API     | 3.5  | `<script setup>` 语法糖 + 逻辑复用更灵活 |
| 构建工具   | Vite                        | 8.x  | 极速 HMR，原生 ESM 开发体验              |
| 可视化引擎 | ECharts                     | 6.x  | 丰富的图表类型 + 地图支持 + 主题定制     |
| 状态管理   | Pinia                       | 3.0  | 轻量、TypeScript 友好、模块化 Store      |
| UI 组件库  | Element Plus                | 2.13 | 表格 / 表单 / 抽屉 / 分页等企业级组件    |
| 后端框架   | Express                     | 4.21 | 轻量灵活，适合中小型 API 服务            |
| 数据库     | SQLite + better-sqlite3     | 11.5 | 零部署嵌入式数据库，同步 API 性能更优    |
| 桌面打包   | Electron + electron-builder | 28.0 | 跨平台桌面应用，内嵌后端服务             |
| 样式方案   | Less                        | 4.6  | 全局变量体系 + 混入复用                  |

---

## 功能模块

### 1. 数据大屏（DataScreen）

核心可视化页面，采用三栏布局 + 底部面板的经典大屏结构：

- **顶部**：4 项核心统计指标（桥梁总数 / 涉及省份 / 桥型分类 / 历史跨度），实时时钟
- **左侧**：地区分布统计卡片 + 全国地图（支持省份下钻至市级）
- **中间**：桥梁类型发展趋势折线图 + 桥型占比饼图（**双图联动**）
- **右侧**：工艺技术环形进度统计 + 施工技术堆叠柱状图
- **底部**：年度趋势迷你折线图 + 结构分析面积图 + 关键指标监控

### 2. 全国地图省份下钻

- 动态加载阿里 DataV GeoJSON 数据，支持 **全国 → 省 → 市** 三级下钻
- 自研地名匹配算法，兼容简称 / 全称 / 自治州 / 市县后缀等多种格式
- 省份统计热力图渲染，hover 显示详细数据

### 3. 桥梁结构对比分析

- 六维雷达图对比（泄洪性 / 刚度 / 跨越能力 / 抗风稳定性 / 抗震性 / 资金使用）
- 单指标柱状图横向对比
- 桥梁工程文献与人物介绍

### 4. 数据集管理

- 完整 CRUD 操作：新增 / 编辑（抽屉表单）/ 删除（确认弹窗）/ 批量删除
- 多条件筛选：关键词搜索 + 桥型 / 朝代 / 材料 / 工艺组合筛选
- Element Plus 分页（10 / 20 / 50 / 100 条）
- Excel 导入导出（基于 xlsx 库）

### 5. 典型桥梁详情

- 6 大桥型分类，共 19 座典型桥梁详细介绍
- 展示桥梁长度、主跨跨度、建成年份、工程描述

### 6. 桥梁工艺著作

- 古代经典工艺文献（《天工开物》《桥谱》等）与现代施工技术著作展示

---

## 项目亮点

### 1. ECharts 多图表联动

`Bridge.vue` 中实现了折线图与饼图的实时联动：鼠标 hover 折线图某一朝代时，饼图自动切换展示该朝代的桥型分布占比。通过监听 `updateAxisPointer` 事件，动态修改饼图的 `encode.value` 和 `label.formatter`，实现零延迟的数据联动体验。

### 2. 前后端优雅降级

所有 Pinia action 均采用 try-catch 容错模式——优先请求后端 API，请求失败时自动降级到本地 mock JSON 数据。确保应用在离线或后端不可用的情况下仍可完整运行，实现了 **零白屏** 的用户体验。

### 3. Electron 进程级集成

Electron 主进程通过 `child_process.fork` 启动 Express 后端，并实现 `waitForServer` 健康检查轮询（500ms 间隔，最多 30 次重试），确保后端就绪后才加载前端页面。关闭窗口时自动终止后端子进程，防止资源泄露。

### 4. 深色科技风 UI 体系

- 卡片边框流动动画（CSS `mask-composite` + `@keyframes borderFlow`）
- Hover 红色辉光效果（多层 `box-shadow` + `inset` 内发光）
- 封装高复用可视化组件：`StatCard` / `RingProgress` / `MiniLine` / `DataPanel`
- 全局 Less 变量体系统一色彩与间距

### 5. 数据库查询优化

SQLite 单表设计配合 4 个索引（dynasty / province / material / technology），使用 `better-sqlite3` 同步驱动 + prepared statements 防注入，批量导入采用事务包裹保证数据一致性。

---

## 目录结构

```
├── electron/
│   └── main.cjs              # Electron 主进程：fork 后端 + 健康检查 + 窗口管理
├── server/
│   ├── index.js              # Express 后端：RESTful API + SQLite 操作
│   ├── init-db.js            # 数据库初始化脚本（建表 + 索引 + 事务批量导入）
│   └── bridges.db            # SQLite 数据库
├── src/
│   ├── main.js               # Vue 应用入口
│   ├── App.vue               # 根组件
│   ├── router/index.js       # Hash 路由配置（懒加载）
│   ├── store/                # Pinia 状态管理
│   │   ├── bridge.js         # 桥梁 CRUD + API 降级
│   │   ├── map.js            # 地图数据 + GeoJSON 加载
│   │   ├── material.js       # 材料统计
│   │   ├── technology.js     # 工艺数据
│   │   ├── anlysis.js        # 对比分析
│   │   └── Dataset.js        # 数据集分页
│   ├── views/                # 页面视图
│   │   ├── HomePage.vue      # 首页：轮播 + 功能入口
│   │   ├── DataScreen.vue    # 数据大屏：核心可视化页
│   │   ├── Dataset.vue       # 数据集管理：CRUD + Excel
│   │   └── DataScreen/       # 大屏子页面
│   ├── components/
│   │   ├── Charts/           # ECharts 图表组件
│   │   ├── DataStats/        # 统计可视化组件库
│   │   ├── anlysis/          # 对比分析组件
│   │   └── form/             # 表单组件（Excel 上传）
│   ├── hooks/                # 自定义 Hooks（useNavigate）
│   ├── utils/                # 工具函数 + ECharts 主题
│   ├── mock/                 # Mock 数据 + JSON
│   └── css/                  # 全局样式变量
└── vite.config.js            # Vite 配置（代理 / Less 全局变量 / 路径别名）
```

---

## API 设计

后端遵循 RESTful 规范，统一响应格式 `{ code, message, data }`：

| 方法   | 端点                         | 功能                  |
| ------ | ---------------------------- | --------------------- |
| GET    | `/api/bridges`               | 分页查询 + 多条件筛选 |
| GET    | `/api/bridges/:id`           | 单条详情              |
| GET    | `/api/bridges/by-dynasty`    | 按朝代聚合统计        |
| GET    | `/api/bridges/by-province`   | 按省份聚合统计        |
| GET    | `/api/bridges/by-material`   | 按材料聚合统计        |
| GET    | `/api/bridges/by-technology` | 按工艺聚合统计        |
| POST   | `/api/bridges`               | 新增桥梁              |
| PUT    | `/api/bridges/:id`           | 更新桥梁              |
| DELETE | `/api/bridges/:id`           | 删除桥梁              |
| POST   | `/api/bridges/batch-delete`  | 批量删除              |
| POST   | `/api/bridges/import`        | 批量导入（事务）      |
| GET    | `/api/statistics/overview`   | 统计概览              |
| GET    | `/api/health`                | 健康检查              |

---

## 快速启动

```bash
# 1. 安装前端依赖
npm install

# 2. 安装后端依赖并初始化数据库
cd server && npm install && node init-db.js && cd ..

# 3. 启动后端服务
cd server && npm start &

# 4. 启动前端开发服务器
npm run dev
```

桌面应用打包：

```bash
npm run electron:build    # 输出 → release/桥梁信息系统.exe
```

---

## 技术难点与解决方案

| 难点                          | 方案                                                    |
| ----------------------------- | ------------------------------------------------------- |
| Electron + Express 进程时序   | `waitForServer` 轮询健康检查，确认就绪后加载页面        |
| ECharts 折线图与饼图联动      | `updateAxisPointer` 事件 + 动态 `setOption` 修改 encode |
| GeoJSON 地名与数据库不匹配    | 多策略匹配：精确 → 去后缀 → 特殊映射表                  |
| Vite ESM 与 Electron CJS 兼容 | Electron 入口使用 `.cjs`，`asarUnpack` 解包 native 模块 |
| 前后端数据一致性              | API 优先 + mock 降级，`init-db.js` 确保 DB 与 JSON 同源 |
