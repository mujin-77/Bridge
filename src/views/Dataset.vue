<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <div class="sidebar">
      <button @click="go('/HomePage')">
        返回
      </button>
      <h2 class="title">
        数据中心
      </h2>

      <!-- 桥梁 -->
      <div
        class="menu-title"
        @click="toggle('bridge')"
      >
        桥梁 ▾
      </div>
      <div v-show="open.bridge">
        <div
          class="menu-item"
          @click="selectType('全部')"
        >
          全部桥梁
        </div>
        <div
          v-for="item in bridgeTypes"
          :key="item"
          class="menu-item"
          @click="selectType(item)"
        >
          {{ item }}
        </div>
      </div>

      <!-- 书籍 -->
      <div
        class="menu-title"
        @click="toggle('book')"
      >
        书籍 ▾
      </div>
      <div v-show="open.book">
        <div
          class="menu-item"
          @click="selectBook('桥梁史')"
        >
          桥梁史
        </div>
        <div
          class="menu-item"
          @click="selectBook('工程结构')"
        >
          工程结构
        </div>
      </div>

      <!-- 上传 -->
      <div
        class="menu-title"
        @click="currentPage = 'upload'"
      >
        上传数据
      </div>
      <div
        class="menu-title"
        @click="logout()"
      >
        退出登录
      </div>
    </div>

    <!-- 右侧 -->
    <div class="content">
      <button
        v-if="currentPage !== 'upload'"
        @click="exportAll"
      >
        导出全部
      </button>
      <div class="content-header">
        {{ currentTitle || '请选择内容' }}
      </div>

      <!-- 上传 -->
      <div
        v-if="currentPage === 'upload'"
        class="card"
      >
        <div style="margin-bottom:20px">
          <label>数据类型：</label>
          <select v-model="form.type">
            <option value="bridge">
              桥梁
            </option>
            <option value="book">
              书籍
            </option>
          </select>
        </div>
        <!-- 桥梁表单 -->
        <div
          v-if="form.type === 'bridge'"
          class="text-row"
        >
          <Form />
        </div>

        <!-- 书籍表单 -->
        <div v-else>
          <Form2 />
        </div>
      </div>

      <!-- 数据展示（自动切换） -->
      <div
        v-else
        class="content-body"
      >
        <div class="card">
          <h3>数据表</h3>
          <input
            v-model="keyword"
            placeholder="搜索桥梁名称 / 地点"
            style="margin-bottom:10px;padding:5px"
          >
          <table>
            <thead>
              <tr>
                <th>桥梁名称</th>
                <th>桥梁类型</th>
                <th>建成年份</th>
                <th>所在地点</th>
                <th>操作</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in filteredData"
                :key="index"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.year }}</td>
                <td>{{ item.location }}</td>
                <td>
                  <button @click="editRow(index)">
                    编辑
                  </button>
                  <button @click="deleteRow(index)">
                    删除
                  </button>
                  <button @click="exportOne(item)">
                    下载
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
  </div>
</template>

<script setup>
import { ref, computed,onMounted,watch } from 'vue'
import { useBridgeStore } from '@/store/Dataset'
import { useNavigate } from '@/hooks/useNavigate.js'
import Form from '@/components/form/form.vue'
import Form2 from '@/components/form/form2.vue'
import * as XLSX from 'xlsx'
const { go, logout } = useNavigate()
const tableData = ref([])

// 菜单控制
const open = ref({ bridge: true, book: false })
const toggle = (key) => (open.value[key] = !open.value[key])

// 页面状态
//const loading = ref(false)
const currentPage = ref('data')
const currentTitle = ref('')

// 桥梁类型
const bridgeTypes = ['梁式桥', '拱式桥', '斜拉桥', '悬索桥','钢架桥','浮桥']

//搜索
const keyword = ref('')
watch(keyword, (val) => {
  bridgeStore.filterData(val)
})

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

// 书籍点击
const selectBook = (book) => {
  currentPage.value = 'data'
  currentTitle.value = book
  tableData.value = [
    { name: book + '章节1', value: 50 },
    { name: book + '章节2', value: 80 }
  ]
}


// 搜索/过滤条件（示例）
const drawerSize = computed(() => {
  return window.innerWidth > 1000 ? '30%' : '50%'
})

// 编辑抽屉相关状态
const editDrawerVisible = ref(false)
const editForm = ref({ name: '', type: '', year: '', location: '' })
const editIndex = ref(null)  // 保存原始数组中的真实索引

// 点击编辑按钮
const editRow = (indexInFiltered) => {
  // 1. 从过滤后的数据中获取当前行对象
  const row = filteredData.value[indexInFiltered]
  if (!row) return

  // 2. 在原始数组中查找该对象的真实索引（若对象引用不变可直接用 findIndex）
  const list = bridgeStore.list
  const realIndex = list.findIndex(item => item === row)
  
  if (realIndex === -1) {
    console.warn('未找到对应原始数据')
    return
  }

  editIndex.value = realIndex
  editForm.value = { ...row }   // 浅拷贝到表单
  editDrawerVisible.value = true
}

// 保存编辑
const saveEdit = () => {
  if (editIndex.value !== null) {
    // 直接更新原始数组对应项（Pinia state 是响应式的）
    bridgeStore.list[editIndex.value] = { ...editForm.value }
    editDrawerVisible.value = false
  }
}

// 取消编辑
const cancelEdit = () => {
  editDrawerVisible.value = false
}

// 删除行（示例）
const deleteRow = (indexInFiltered) => {
  const row = filteredData.value[indexInFiltered]
  const list = bridgeStore.list
  const realIndex = list.findIndex(item => item === row)
  if (realIndex !== -1) {
    list.splice(realIndex, 1)
  }
}
const exportOne = (row) => {
  const ws = XLSX.utils.json_to_sheet([row])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '数据')

  XLSX.writeFile(wb, row.name + '.xlsx')
}

const exportAll = () => {
  const ws = XLSX.utils.json_to_sheet(tableData.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '全部数据')

  XLSX.writeFile(wb, '桥梁数据.xlsx')
}

const form = ref({
  type: 'bridge', // 默认桥梁

  // 桥梁字段
  name: '',
  bridgeType: '',
  year: '',
  location: '',

  // 书籍字段
  author: '',
  publishYear: ''
})


</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #19445e;
  color: #fff
}

.sidebar {
  width: 220px;
  padding: 20px;
  background: #0b1d2a;
  overflow-y: auto;
}

.title {
  font-size: 34px;
}

.menu-title {
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 22px;
}

.menu-title:hover {
  background: #184765
}

.menu-item {
  padding: 8px 10px;
  cursor: pointer
}

.menu-item:hover {
  background: #123c57
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.content-header {
  font-size: 22px;
  margin-bottom: 20px
}

.content-body {
  display: flex;
  gap: 20px
}
.card {
  flex: 1;
  background: #2c5e7c;
  padding: 20px;
  border-radius: 10px;
  .text-row {
    margin-bottom: 30px;
  }
  .input {
    flex: 1;
    height: 32px;
    padding: 5px;

    border: 1px solid rgba(248, 113, 113, 0.3);
    border-radius: 4px;

    background: rgba(2, 6, 23, 0.8);
    color: #e2e8f0;
  }
  .input:focus {
    outline: none;
    border-color: #f87171;
    box-shadow: 0 0 8px rgba(248, 113, 113, 0.6);
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #e2e8f0;
  th,
  td {
    border: 1px solid rgba(148, 163, 184, 0.8);
    padding: 12px;
    text-align: center;
  }
  th {
    background: rgba(56, 189, 248, 0.5);
  }
  tr:nth-child(even) {
    background: rgba(15, 23, 42, 0.3);
  }
}
</style>