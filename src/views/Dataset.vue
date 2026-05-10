<template>
  <div class="dataset-page">
    <div class="layout">
      <!-- 左侧菜单 -->
      <div class="sidebar">
        <div class="sidebar-header">
          <button
            class="back-btn"
            @click="go('/HomePage')"
          >
            <span class="icon">←</span> 返回首页
          </button>
        </div>
        <h2 class="title">
          数据中心
        </h2>

        <!-- 桥梁分类 -->
        <div class="menu-section">
          <div
            class="section-title"
            @click="toggle('bridge')"
          >
            <span class="icon">🌉</span> 桥梁分类
            <span class="arrow">{{ open.bridge ? '▼' : '▶' }}</span>
          </div>
          <div
            v-show="open.bridge"
            class="menu-list"
          >
            <div
              class="menu-item"
              :class="{ active: currentType === '全部' }"
              @click="selectType('全部')"
            >
              <span class="item-text">全部桥梁</span>
              <span class="badge">{{ bridgeStore.rawData.length }}</span>
            </div>
            <div
              v-for="item in bridgeTypes"
              :key="item"
              class="menu-item"
              :class="{ active: currentType === item }"
              s
              @click="selectType(item)"
            >
              <span class="item-text">{{ item }}</span>
              <span class="badge">{{ getTypeCount(item) }}</span>
            </div>
          </div>
        </div>

        <!-- 功能按钮 -->
        <div class="menu-section">
          <div
            class="section-title"
            :class="{ active: currentPage === 'upload' }"
            @click="currentPage = 'upload'"
          >
            上传数据
          </div>
        </div>

        <div class="menu-section">
          <div
            class="section-title logout"
            @click="logout()"
          >
            退出登录
          </div>
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="content">
        <!-- 数据展示页面 -->
        <template v-if="currentPage !== 'upload'">
          <!-- 顶部信息栏 -->
          <div class="top-bar">
            <div class="title-section">
              <h1 class="page-title">
                {{ currentTitle || '全部桥梁' }}
              </h1>
              <div class="stats-row">
                <div class="stat-item">
                  <span class="stat-value">{{ filteredData.length }}</span>
                  <span class="stat-label">当前显示</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">{{ bridgeStore.rawData.length }}</span>
                  <span class="stat-label">总数据</span>
                </div>
              </div>
            </div>
            <div class="actions">
              <el-button
                type="primary"
                @click="exportAll"
              >
                <span class="btn-icon">📥</span> 导出全部
              </el-button>
            </div>
          </div>

          <!-- 搜索栏 -->
          <div class="search-bar">
            <div class="search-box">
              <input
                v-model="keyword"
                placeholder="搜索桥梁名称、地点..."
                class="search-input"
              >
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th class="col-index">
                    #
                  </th>
                  <th class="col-name">
                    桥梁名称
                  </th>
                  <th class="col-type">
                    桥梁类型
                  </th>
                  <th class="col-year">
                    建成年份
                  </th>
                  <th class="col-location">
                    所在地点
                  </th>
                  <th class="col-material">
                    建筑材料
                  </th>
                  <th class="col-action">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paginatedData"
                  :key="item.id"
                  class="table-row"
                >
                  <td class="col-index">
                    {{ (currentPageNum - 1) * pageSize + index + 1 }}
                  </td>
                  <td class="col-name">
                    {{ item.name }}
                  </td>
                  <td class="col-type">
                    <span class="type-tag">{{ item.type }}</span>
                  </td>
                  <td class="col-year">
                    {{ item.year }}
                  </td>
                  <td class="col-location">
                    {{ item.location }}
                  </td>
                  <td class="col-material">
                    {{ item.material || '-' }}
                  </td>
                  <td class="col-action">
                    <button
                      class="action-btn edit"
                      @click="editRow(index)"
                    >
                      编辑
                    </button>
                    <button
                      class="action-btn delete"
                      @click="deleteRow(index)"
                    >
                      删除
                    </button>
                    <button
                      class="action-btn export"
                      @click="exportOne(item)"
                    >
                      导出
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="currentPageNum"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="filteredData.length"
              layout="total, sizes, prev, pager, next, jumper"
              background
            />
          </div>
        </template>

        <!-- 上传页面 -->
        <template v-else>
          <div class="upload-container">
            <div class="upload-card">
              <div class="upload-form">
                <Form />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 编辑抽屉 -->
    <el-drawer
      v-model="editDrawerVisible"
      title="编辑桥梁信息"
      direction="rtl"
      :size="drawerSize"
      custom-class="edit-drawer"
    >
      <el-form
        :model="editForm"
        label-width="100px"
        class="edit-form"
      >
        <el-form-item label="桥梁名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="桥梁类型">
          <el-input v-model="editForm.type" />
        </el-form-item>
        <el-form-item label="建成年份">
          <el-input v-model="editForm.year" />
        </el-form-item>
        <el-form-item label="所在地点">
          <el-input v-model="editForm.location" />
        </el-form-item>
        <el-form-item label="建筑材料">
          <el-input v-model="editForm.material" />
        </el-form-item>
      </el-form>

      <div class="drawer-footer">
        <el-button @click="cancelEdit">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="saveEdit"
        >
          保存
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useBridgeStore } from '@/store/bridge'
import { useNavigate } from '@/hooks/useNavigate.js'
import Form from '@/components/form/form.vue'
import * as XLSX from 'xlsx'

const { go, logout } = useNavigate()

// Store
const bridgeStore = useBridgeStore()
bridgeStore.setType('全部')

// 菜单控制
const open = ref({ bridge: true })
const toggle = (key) => (open.value[key] = !open.value[key])

// 页面状态
const currentPage = ref('data')
const currentTitle = ref('全部桥梁')
const currentType = ref('全部')

// 桥梁类型
const bridgeTypes = computed(() => bridgeStore.bridgeTypes)

// 搜索
const keyword = ref('')

// 分页
const currentPageNum = ref(1)
const pageSize = ref(20)

// 过滤数据
const filteredData = computed(() => {
  let data = bridgeStore.list
  if (keyword.value) {
    const kw = keyword.value.toLowerCase()
    data = data.filter(item =>
      item.name.toLowerCase().includes(kw) ||
      item.location.toLowerCase().includes(kw) ||
      item.type.toLowerCase().includes(kw)
    )
  }
  return data
})

// 分页数据
const paginatedData = computed(() => {
  const start = (currentPageNum.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// 搜索时重置页码
watch(keyword, () => {
  currentPageNum.value = 1
})

// 切换类型时重置页码和关键词
watch(currentType, () => {
  currentPageNum.value = 1
  keyword.value = ''
})

// 获取类型数量
const getTypeCount = (type) => {
  if (type === '全部') return bridgeStore.rawData.length
  return bridgeStore.rawData.filter(item => {
    const t = item.type || ''
    switch (type) {
    case '梁式桥': return t.includes('梁')
    case '拱式桥': return t.includes('拱')
    case '悬索桥': return t.includes('悬索')
    case '斜拉桥': return t.includes('斜拉')
    case '刚架桥': return (t.includes('钢') || t.includes('桁')) && !t.includes('斜拉')
    case '浮桥': return t.includes('浮')
    default: return true
    }
  }).length
}


// 桥梁点击
const selectType = (type) => {
  currentPage.value = 'data'
  currentTitle.value = type || '全部桥梁'
  currentType.value = type
  bridgeStore.setType(type)
}

// 抽屉尺寸
const drawerSize = computed(() => {
  return window.innerWidth > 1000 ? '30%' : '50%'
})

// 编辑抽屉相关状态
const editDrawerVisible = ref(false)
const editForm = ref({ name: '', type: '', year: '', location: '', material: '' })
const editIndex = ref(null)

// 点击编辑按钮
const editRow = (indexInPage) => {
  const row = paginatedData.value[indexInPage]
  if (!row) return

  editIndex.value = indexInPage
  editForm.value = { ...row }
  editDrawerVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  if (editForm.value.id !== null) {
    bridgeStore.updateBridge(editForm.value.id, editForm.value)
    editDrawerVisible.value = false
  }
}

// 取消编辑
const cancelEdit = () => {
  editDrawerVisible.value = false
}

// 删除行
const deleteRow = (indexInPage) => {
  const row = paginatedData.value[indexInPage]
  if (row) {
    bridgeStore.deleteBridge(row.id)
  }
}

// 导出单行
const exportOne = (row) => {
  const ws = XLSX.utils.json_to_sheet([row])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '数据')
  XLSX.writeFile(wb, row.name + '.xlsx')
}

// 导出全部
const exportAll = () => {
  const ws = XLSX.utils.json_to_sheet(filteredData.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '桥梁数据')
  XLSX.writeFile(wb, '桥梁数据.xlsx')
}
</script>

<style lang="less" scoped>
.dataset-page {
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.layout {
  display: flex;
  height: 100vh;
}

// 左侧菜单
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 8px;
  color: #38bdf8;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(56, 189, 248, 0.2);
    border-color: #38bdf8;
  }

  .icon {
    font-size: 16px;
  }
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(248, 113, 113, 0.3);
}

.menu-section {
  margin-bottom: 15px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;

  .icon {
    font-size: 18px;
  }

  .arrow {
    margin-left: auto;
    font-size: 12px;
  }

  &:hover {
    background: rgba(248, 113, 113, 0.1);
    color: #f8fafc;
  }

  &.active {
    background: rgba(248, 113, 113, 0.2);
    color: #f87171;
  }

  &.logout:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}

.menu-list {
  margin-top: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 8px;
  color: #cbd5e1;
  cursor: pointer;
  transition: all 0.3s;

  .item-icon {
    font-size: 16px;
  }

  .item-text {
    flex: 1;
    font-size: 14px;
  }

  .badge {
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
  }

  &:hover {
    background: rgba(56, 189, 248, 0.1);
    color: #f8fafc;
  }

  &.active {
    background: linear-gradient(90deg, rgba(248, 113, 113, 0.2), rgba(248, 113, 113, 0.1));
    color: #f87171;
    border-left: 3px solid #f87171;

    .badge {
      background: rgba(248, 113, 113, 0.3);
      color: #f87171;
    }
  }
}

// 右侧内容
.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

// 顶部信息栏
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.title-section {
  .page-title {
    font-size: 32px;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 15px 0;
  }
}

.stats-row {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #38bdf8;
  }

  .stat-label {
    font-size: 14px;
    color: #64748b;
  }
}

.actions {
  display: flex;
  gap: 10px;

  .btn-icon {
    margin-right: 5px;
  }
}

// 搜索栏
.search-bar {
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  max-width: 400px;

  .search-input {
    width: 100%;
    padding: 12px 45px 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    color: #f8fafc;
    font-size: 14px;
    transition: all 0.3s;

    &::placeholder {
      color: #64748b;
    }

    &:focus {
      outline: none;
      border-color: #38bdf8;
      background: rgba(56, 189, 248, 0.05);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }
  }

  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    opacity: 0.5;
  }
}

// 数据表格
.table-container {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  th {
    background: rgba(248, 113, 113, 0.1);
    color: #f87171;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .table-row {
    transition: all 0.2s;

    &:hover {
      background: rgba(56, 189, 248, 0.05);
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  td {
    color: #e2e8f0;
    font-size: 14px;
  }

  .col-index {
    width: 60px;
    color: #64748b;
  }

  .col-name {
    font-weight: 600;
    color: #f8fafc;
  }

  .col-type {
    .type-tag {
      display: inline-block;
      padding: 4px 10px;
      background: rgba(56, 189, 248, 0.15);
      color: #38bdf8;
      border-radius: 6px;
      font-size: 12px;
    }
  }

  .col-year {
    color: #38bdf8;
    font-weight: 500;
  }

  .col-action {
    .action-btn {
      padding: 6px 12px;
      margin-right: 8px;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;

      &.edit {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
        &:hover { background: rgba(56, 189, 248, 0.25); }
      }

      &.delete {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
        &:hover { background: rgba(239, 68, 68, 0.25); }
      }

      &.export {
        background: rgba(34, 197, 94, 0.15);
        color: #22c55e;
        &:hover { background: rgba(34, 197, 94, 0.25); }
      }
    }
  }
}

// 分页
.pagination-container {
  display: flex;
  justify-content: center;
  padding: 20px 0;

  :deep(.el-pagination) {
    background: rgba(30, 41, 59, 0.8);
    padding: 15px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    .el-pager li {
      background: transparent;
      color: #94a3b8;
      border-radius: 6px;

      &.is-active {
        background: #f87171;
        color: #fff;
      }

      &:hover {
        color: #f87171;
      }
    }

    .btn-prev, .btn-next {
      background: transparent;
      color: #94a3b8;
      border-radius: 6px;

      &:hover {
        color: #f87171;
      }
    }

    .el-pagination__total {
      color: #64748b;
    }

    .el-pagination__sizes {
      .el-select {
        .el-input__inner {
          background: transparent;
          color: #e2e8f0;
          border-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

// 上传页面
.upload-container {
  max-width: 800px;
  margin: 0 auto;
}

.upload-card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .upload-title {
    font-size: 24px;
    color: #f8fafc;
    margin-bottom: 30px;
    text-align: center;
  }
}

// 编辑抽屉
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.edit-drawer) {
  background: #1e293b;

  .el-drawer__header {
    background: rgba(248, 113, 113, 0.1);
    color: #f8fafc;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 0;
    padding: 20px;
  }

  .el-drawer__body {
    padding: 20px;
  }

  .el-form-item__label {
    color: #94a3b8;
  }

  .el-input__wrapper {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);

    .el-input__inner {
      color: #f8fafc;
    }
  }
}
</style>
