import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun']
plt.rcParams['axes.unicode_minus'] = False

fig, ax = plt.subplots(1, 1, figsize=(14, 16))
ax.set_xlim(0, 10)
ax.set_ylim(0, 18)
ax.axis('off')

# 定义颜色
colors = {
    'presentation': '#4472C4',  # 蓝色 - 表现层
    'business': '#70AD47',      # 绿色 - 业务逻辑层
    'api': '#ED7D31',           # 橙色 - 数据接口层
    'data': '#5B9BD5',          # 浅蓝色 - 数据层
    'arrow': '#666666'
}

# 绘制标题
ax.text(5, 17.5, '系统四层架构设计', 
        ha='center', va='center', fontsize=20, fontweight='bold')

# 定义四层架构
layers = [
    {
        'name': '表现层（前端UI）',
        'y': 13.5,
        'height': 2.5,
        'color': colors['presentation'],
        'items': [
            'Vue 3.5.30 - 渐进式前端框架',
            'Vite 8.0.11 - 前端构建工具',
            'Element Plus 2.13.6 - UI组件库',
            'ECharts 6.0.0 - 数据可视化',
            'Three.js 0.184.0 - 3D可视化'
        ]
    },
    {
        'name': '业务逻辑层',
        'y': 9.5,
        'height': 2.5,
        'color': colors['business'],
        'items': [
            'Pinia 3.0.4 - 状态管理',
            'Vue Router 4 - 路由管理',
            '前端业务逻辑处理',
            '组件化业务模块',
            '用户交互与事件处理'
        ]
    },
    {
        'name': '数据接口层',
        'y': 5.5,
        'height': 2.5,
        'color': colors['api'],
        'items': [
            'Express 5.2.1 - 后端框架',
            'RESTful API 接口设计',
            'Axios - HTTP 请求库',
            '数据格式验证与转换',
            '跨域资源共享 (CORS)'
        ]
    },
    {
        'name': '数据层',
        'y': 1.5,
        'height': 2.5,
        'color': colors['data'],
        'items': [
            'SQLite 6.0.1 - 轻量级数据库',
            '桥梁数据存储与管理',
            '数据的增删改查操作',
            '数据持久化存储',
            '数据库备份与恢复'
        ]
    }
]

# 绘制每一层
for layer in layers:
    # 绘制层背景
    box = FancyBboxPatch(
        (1, layer['y']), 8, layer['height'],
        boxstyle="round,pad=0.1",
        edgecolor='black',
        facecolor=layer['color'],
        alpha=0.3,
        linewidth=2
    )
    ax.add_patch(box)
    
    # 绘制层标题
    ax.text(5, layer['y'] + layer['height'] - 0.3, layer['name'],
            ha='center', va='center', fontsize=14, fontweight='bold',
            bbox=dict(boxstyle='round', facecolor='white', alpha=0.8, edgecolor='black'))
    
    # 绘制层内容
    item_y = layer['y'] + layer['height'] - 0.8
    for item in layer['items']:
        ax.text(5, item_y, f'• {item}',
                ha='center', va='center', fontsize=9)
        item_y -= 0.35

# 绘制层间箭头
arrow_props = dict(arrowstyle='->', lw=2, color=colors['arrow'])
ax.annotate('', xy=(5, 9.5), xytext=(5, 11.0),
            arrowprops=arrow_props)
ax.annotate('', xy=(5, 5.5), xytext=(5, 7.0),
            arrowprops=arrow_props)
ax.annotate('', xy=(5, 1.5), xytext=(5, 3.0),
            arrowprops=arrow_props)

# 添加箭头标签
ax.text(5.3, 10.2, '用户交互', fontsize=8, color=colors['arrow'])
ax.text(5.3, 6.2, 'API调用', fontsize=8, color=colors['arrow'])
ax.text(5.3, 2.2, '数据操作', fontsize=8, color=colors['arrow'])

# 添加说明文本框
specs = [
    '架构说明：',
    '• 表现层：负责用户界面展示与交互，使用 Vue 3 构建响应式UI',
    '• 业务逻辑层：通过 Pinia 管理全局状态，处理各类业务逻辑',
    '• 数据接口层：Express 提供 RESTful API，实现前后端分离',
    '• 数据层：SQLite 数据库存储桥梁数据，支持增删改查与持久化'
]

spec_y = 0.8
for spec in specs:
    ax.text(1, spec_y, spec, fontsize=8, va='top',
            bbox=dict(boxstyle='round', facecolor='#FFFFCC', alpha=0.5))
    spec_y -= 0.25

plt.tight_layout()
plt.savefig('d:/前端/my-project/images_temp/系统四层架构设计图.png', 
            dpi=300, bbox_inches='tight', facecolor='white')
print("架构图已生成：d:/前端/my-project/images_temp/系统四层架构设计图.png")
