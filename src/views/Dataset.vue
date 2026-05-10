<template>
  <div class="dataset-container">
    <!-- 顶部装饰线 -->
    <div class="top-decoration">
      <div class="decoration-line" />
      <div class="glow-orb orb-1" />
      <div class="glow-orb orb-2" />
    </div>

    <!-- 左侧菜单 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <button 
          class="back-btn"
          @click="go('/HomePage')"
        >
          <span class="btn-icon">←</span>
          返回首页
        </button>
      </div>
      
      <h2 class="sidebar-title">
        数据中心
      </h2>

      <!-- 桥梁分类 -->
      <div class="menu-section">
        <div
          class="menu-title"
          @click="toggle('bridge')"
        >
          <span class="menu-icon">🌉</span>
          桥梁分类
          <span class="arrow">{{ open.bridge ? '▼' : '▶' }}</span>
        </div>
        <transition name="slide">
          <div 
            v-show="open.bridge"
            class="menu-items"
          >
            <div
              class="menu-item"
              :class="{ active: currentTitle === '全部' }"
              @click="selectType('全部')"
            >
              <span class="item-dot all" />
              全部桥梁
            </div>
            <div
              v-for="item in bridgeTypes"
              :key="item"
              class="menu-item"
              :class="{ active: currentTitle === item }"
              @click="selectType(item)"
            >
              <span class="item-dot" />
              {{ item }}
            </div>
          </div>
        </transition>
      </div>

      <!-- 功能菜单 -->
      <div class="menu-section">
        <div
          class="menu-title"
          @click="currentPage = 'upload'"
        >
          上传数据
        </div>
        <div
          class="menu-title danger"
          @click="logout()"
        >
          退出登录
        </div>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="content">
      <!-- 顶部操作栏 -->
      <div 
        v-if="currentPage !== 'upload'"
        class="content-toolbar"
      >
        <div class="toolbar-left">
          <h1 class="page-title">
            {{ currentTitle || '请选择分类查看' }}
          </h1>
          <!-- 统计卡片 -->
          <div class="stats-mini">
            <div class="stat-item">
              <span class="stat-value">{{ bridgeStore.total }}</span>
              <span class="stat-label">数据总量</span>
            </div>
          </div>
        </div>
        
        <div class="toolbar-right">
          <button 
            v-if="currentPage !== 'upload'"
            class="export-btn"
            :disabled="isExporting"
            @click="exportAll"
          >
            <span class="btn-icon">{{ isExporting ? '⏳' : '📥' }}</span>
            {{ isExporting ? '导出中...' : '导出全部数据' }}
          </button>
        </div>
      </div>

      <!-- 上传页面 -->
      <div
        v-if="currentPage === 'upload'"
        class="card"
      >
        <div class="upload-wrapper">
          <Form />
        </div>
      </div>

      <!-- 数据展示 -->
      <div
        v-else
        class="content-body"
      >
        <div class="card data-card">
          <div class="card-header">
            <h3>
              <span class="header-icon">📋</span>
              数据列表
            </h3>
            
            <!-- 搜索框 -->
            <div class="search-box">
              <input
                v-model="keyword"
                placeholder="搜索桥梁名称 / 地点..."
                class="search-input"
              >
              <span class="search-icon">🔍</span>
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>桥梁名称</th>
                  <th>桥梁类型</th>
                  <th>施工工艺</th>
                  <th>建成年份</th>
                  <th>所在地点</th>
                  <th>操作</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(item, index) in filteredData"
                  :key="index"
                  class="table-row"
                >
                  <td class="row-index">
                    {{ index + 1 }}
                  </td>
                  <td class="row-name">
                    {{ item.name }}
                  </td>
                  <td>
                    <span class="type-badge">{{ item.type }}</span>
                  </td>
                  <td>{{ item.technology }}</td>
                  <td>{{ item.year }}</td>
                  <td>{{ item.location }}</td>
                  <td class="action-cell">
                    <button 
                      class="action-btn edit"
                      @click="editRow(index)"
                    >
                      编辑
                    </button>
                    <button 
                      class="action-btn delete"
                      @click="handleDelete(index)"
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
          <div class="pagination-wrapper">
            <Pagination
              :page="bridgeStore.page"
              :total-pages="bridgeStore.totalPages"
              :total="bridgeStore.total"
              @change="bridgeStore.changePage"
            />
          </div>
        </div>
        
        <!-- 浮层编辑表单 -->
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
            <el-form-item label="施工工艺">
              <el-select
                v-model="editForm.technology"
                style="width: 100%"
              >
                <el-option
                  label="明挖扩大基础"
                  value="明挖扩大基础"
                />
                <el-option
                  label="桩基础"
                  value="桩基础"
                />
                <el-option
                  label="沉井基础"
                  value="沉井基础"
                />
                <el-option
                  label="悬臂施工法"
                  value="悬臂施工法"
                />
                <el-option
                  label="预制装配法"
                  value="预制装配法"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="建成年份">
              <el-input v-model="editForm.year" />
            </el-form-item>
            <el-form-item label="所在地点">
              <el-input v-model="editForm.location" />
            </el-form-item>
          </el-form>

          <div style="text-align: right; margin-top: 20px;">
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
    </div>

    <!-- 成功提示 -->
    <Transition name="toast">
      <div 
        v-if="toast.show"
        class="toast"
        :class="toast.type"
      >
        <span class="toast-icon">{{ toast.type === 'success' ? '✅' : '❌' }}</span>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useBridgeStore } from '@/store/Dataset'
import Pagination from '@/views/Dataset/Pagination.vue'
import { useNavigate } from '@/hooks/useNavigate.js'
import Form from '@/components/form/form.vue'
import * as XLSX from 'xlsx'
import { ElMessage, ElMessageBox } from 'element-plus'

const { go, logout } = useNavigate()

// 菜单控制
const open = ref({ bridge: true, book: false })
const toggle = (key) => (open.value[key] = !open.value[key])

// 页面状态
const currentPage = ref('data')
const currentTitle = ref('')

// Toast提示
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

// 桥梁类型
const bridgeTypes = ['梁式桥', '拱式桥', '斜拉桥', '悬索桥', '刚构桥', '组合桥']

// 搜索
const keyword = ref('')
watch(keyword, (val) => {
  bridgeStore.setKeyword(val)
})

// 分页
const bridgeStore = useBridgeStore()
bridgeStore.setType('全部')
onMounted(() => {
  bridgeStore.init()
})

const filteredData = computed(() => bridgeStore.list)

// 桥梁点击
const selectType = (type) => {
  currentPage.value = 'data'
  currentTitle.value = type
  bridgeStore.setType(type)
}

// 抽屉大小
const drawerSize = computed(() => {
  return window.innerWidth > 1000 ? '30%' : '50%'
})

// 编辑抽屉相关状态
const editDrawerVisible = ref(false)
const editForm = ref({ 
  name: '', 
  type: '', 
  technology: '', 
  year: '', 
  location: '' 
})
const editIndex = ref(null)

// 点击编辑按钮
const editRow = (indexInFiltered) => {
  const row = filteredData.value[indexInFiltered]
  if (!row) return

  const list = bridgeStore.list
  const realIndex = list.findIndex(item => item === row)
  
  if (realIndex === -1) {
    ElMessage.error('未找到对应原始数据')
    return
  }

  editIndex.value = realIndex
  editForm.value = { ...row }
  editDrawerVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  if (editIndex.value !== null) {
    bridgeStore.list[editIndex.value] = { ...editForm.value }
    editDrawerVisible.value = false
    showToast('修改成功！')
  }
}

// 取消编辑
const cancelEdit = () => {
  editDrawerVisible.value = false
}

// 删除行
const handleDelete = (indexInFiltered) => {
  ElMessageBox.confirm('确定要删除这条数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const row = filteredData.value[indexInFiltered]
    const list = bridgeStore.list
    const realIndex = list.findIndex(item => item === row)
    if (realIndex !== -1) {
      list.splice(realIndex, 1)
      showToast('删除成功！')
    }
  }).catch(() => {})
}

// 导出单条数据
const exportOne = (row) => {
  try {
    // 准备导出数据
    const exportData = [{
      '桥梁名称': row.name,
      '桥梁类型': row.type,
      '施工工艺': row.technology,
      '建成年份': row.year,
      '所在地点': row.location
    }]
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '桥梁数据')
    
    // 设置列宽
    ws['!cols'] = [
      { wch: 20 }, // 桥梁名称
      { wch: 12 }, // 桥梁类型
      { wch: 15 }, // 施工工艺
      { wch: 12 }, // 建成年份
      { wch: 25 }  // 所在地点
    ]
    
    const fileName = `${row.name || '桥梁数据'}.xlsx`
    XLSX.writeFile(wb, fileName)
    showToast(`已导出: ${fileName}`)
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  }
}

// 导出全部数据（支持导出整个分类的所有数据）
const isExporting = ref(false)
const exportAll = async () => {
  if (isExporting.value) {
    ElMessage.warning('正在导出中，请稍候...')
    return
  }

  isExporting.value = true
  
  try {
    ElMessage.info('正在获取全部数据，请稍候...')
    
    // 调用store中的方法获取所有数据
    const allData = await bridgeStore.fetchAllData()
    
    if (!allData || allData.length === 0) {
      ElMessage.warning('没有可导出的数据')
      return
    }
    
    // 准备导出数据
    const exportData = allData.map(item => ({
      '桥梁名称': item.name || '-',
      '桥梁类型': item.type || '-',
      '施工工艺': item.technology || '-',
      '建成年份': item.year || '-',
      '所在地点': item.location || '-'
    }))
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    const sheetName = currentTitle.value === '全部' ? '全部数据' : currentTitle.value
    XLSX.utils.book_append_sheet(wb, ws, sheetName)
    
    // 设置列宽
    ws['!cols'] = [
      { wch: 20 }, // 桥梁名称
      { wch: 12 }, // 桥梁类型
      { wch: 15 }, // 施工工艺
      { wch: 12 }, // 建成年份
      { wch: 25 }  // 所在地点
    ]
    
    const fileName = `${currentTitle.value || '全部'}桥梁数据_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`
    XLSX.writeFile(wb, fileName)
    showToast(`已导出 ${exportData.length} 条数据: ${fileName}`)
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  } finally {
    isExporting.value = false
  }
}
</script>

<style lang="less" scoped>
/* 整体布局 */
.dataset-container {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e293b 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* 顶部装饰 */
.top-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  pointer-events: none;
  
  .decoration-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(56, 189, 248, 0.5), 
      rgba(129, 140, 248, 0.5), 
      transparent
    );
  }
  
  .glow-orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.3;
    
    &.orb-1 {
      top: -100px;
      left: 20%;
      background: #38bdf8;
    }
    
    &.orb-2 {
      top: -100px;
      right: 20%;
      background: #818cf8;
    }
  }
}

/* 左侧菜单 */
.sidebar {
  width: 260px;
  padding: 20px;
  background: rgba(15, 23, 42, 0.9);
  border-right: 1px solid rgba(148, 163, 184, 0.1);
  overflow-y: auto;
  backdrop-filter: blur(10px);
}

.sidebar-header {
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 6px;
  color: #38bdf8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(56, 189, 248, 0.2);
    transform: translateX(-5px);
  }
  
  .btn-icon {
    font-size: 16px;
  }
}

.sidebar-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 600;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 20px;
  
  .title-icon {
    font-size: 28px;
  }
}

/* 统计卡片 */
.stats-mini {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.stat-item {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  
  .stat-value {
    display: block;
    font-size: 24px;
    font-weight: 700;
    color: #38bdf8;
  }
  
  .stat-label {
    font-size: 12px;
    color: #94a3b8;
  }
}

/* 菜单区域 */
.menu-section {
  margin-bottom: 15px;
}

.menu-title {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(56, 189, 248, 0.15);
  }
  
  .menu-icon {
    font-size: 18px;
  }
  
  .arrow {
    margin-left: auto;
    font-size: 12px;
    color: #64748b;
  }
  
  &.danger:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
  }
}

.menu-items {
  margin-top: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  color: #cbd5e1;
  transition: all 0.3s;
  border-radius: 6px;
  margin-bottom: 4px;
  
  &:hover {
    background: rgba(56, 189, 248, 0.1);
    color: #fff;
  }
  
  &.active {
    background: rgba(56, 189, 248, 0.2);
    color: #38bdf8;
    border-left: 3px solid #38bdf8;
  }
  
  .item-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #64748b;
    
    &.all {
      background: linear-gradient(135deg, #38bdf8, #818cf8);
    }
  }
}

/* 右侧内容 */
.content {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
}

/* 工具栏 */
.content-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 20px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.page-title {
  font-size: 22px;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.data-count {
  padding: 4px 12px;
  background: rgba(56, 189, 248, 0.15);
  border-radius: 20px;
  font-size: 13px;
  color: #38bdf8;
}

.toolbar-right {
  display: flex;
  gap: 10px;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: linear-gradient(135deg, #64748b, #475569);
    box-shadow: none;
  }
  
  .btn-icon {
    font-size: 16px;
  }
}

/* 卡片样式 */
.card {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.1);
  overflow: hidden;
}

.data-card {
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: rgba(56, 189, 248, 0.05);
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  
  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
    font-size: 18px;
    color: #f1f5f9;
    
    .header-icon {
      font-size: 20px;
    }
  }
}

/* 搜索框 */
.search-box {
  position: relative;
  
  .search-input {
    width: 280px;
    padding: 10px 40px 10px 15px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 8px;
    color: #f1f5f9;
    font-size: 14px;
    transition: all 0.3s;
    
    &::placeholder {
      color: #64748b;
    }
    
    &:focus {
      outline: none;
      border-color: #38bdf8;
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
}

/* 表格 */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 15px 20px;
    text-align: left;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }
  
  th {
    background: rgba(56, 189, 248, 0.08);
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #94a3b8;
  }
  
  .table-row {
    transition: background 0.3s;
    
    &:hover {
      background: rgba(56, 189, 248, 0.05);
    }
    
    &:nth-child(even) {
      background: rgba(255, 255, 255, 0.02);
      
      &:hover {
        background: rgba(56, 189, 248, 0.08);
      }
    }
  }
  
  .row-index {
    color: #64748b;
    font-size: 13px;
    width: 60px;
  }
  
  .row-name {
    font-weight: 500;
    color: #f1f5f9;
  }
  
  .type-badge {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(129, 140, 248, 0.15);
    border-radius: 20px;
    font-size: 12px;
    color: #818cf8;
  }
  
  .action-cell {
    display: flex;
    gap: 8px;
  }
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &.edit {
    background: rgba(56, 189, 248, 0.15);
    color: #38bdf8;
    
    &:hover {
      background: rgba(56, 189, 248, 0.25);
    }
  }
  
  &.delete {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
    
    &:hover {
      background: rgba(239, 68, 68, 0.25);
    }
  }
  
  &.export {
    background: rgba(34, 197, 94, 0.15);
    color: #4ade80;
    
    &:hover {
      background: rgba(34, 197, 94, 0.25);
    }
  }
}

/* 分页 */
.pagination-wrapper {
  padding: 20px 25px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

/* 上传区域 */
.upload-wrapper {
  padding: 30px;
}

/* Toast提示 */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #f1f5f9;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  
  &.success {
    border-color: rgba(34, 197, 94, 0.5);
    background: rgba(34, 197, 94, 0.1);
  }
  
  &.error {
    border-color: rgba(239, 68, 68, 0.5);
    background: rgba(239, 68, 68, 0.1);
  }
  
  .toast-icon {
    font-size: 18px;
  }
}

/* 过渡动画 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Element Plus 抽屉样式覆盖 */
:deep(.edit-drawer) {
  background: rgba(15, 23, 42, 0.98) !important;
  
  .el-drawer__header {
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
    margin-bottom: 20px;
    
    .el-drawer__title {
      color: #f1f5f9;
    }
  }
  
  .el-form-item__label {
    color: #94a3b8;
  }
  
  .el-input__wrapper {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
  }
  
  .el-input__inner {
    color: #f1f5f9;
  }
}
</style>