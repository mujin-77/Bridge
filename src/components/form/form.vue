<template>
  <div class="form-container">
    <div class="form-header">
      <h3 class="form-title">
        添加桥梁数据
      </h3>
      <p class="form-subtitle">
        请填写以下信息添加新的桥梁数据
      </p>
    </div>

    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="bridge-form"
    >
      <!-- 桥梁名称 -->
      <el-form-item
        label="桥梁名称"
        prop="name"
      >
        <el-input 
          v-model="ruleForm.name" 
          placeholder="请输入桥梁名称（4-14个字符）"
          clearable
        />
      </el-form-item>
      
      <!-- 桥梁类型 -->
      <el-form-item
        label="桥梁类型"
        prop="type"
      >
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择桥梁类型"
          clearable
        >
          <el-option
            label="梁式桥"
            value="梁式桥"
          />
          <el-option
            label="拱式桥"
            value="拱式桥"
          />
          <el-option
            label="斜拉桥"
            value="斜拉桥"
          />
          <el-option
            label="悬索桥"
            value="悬索桥"
          />
          <el-option
            label="刚构桥"
            value="刚构桥"
          />
          <el-option
            label="组合桥"
            value="组合桥"
          />
        </el-select>
      </el-form-item>
      
      <!-- 施工工艺 -->
      <el-form-item
        label="施工工艺"
        prop="technology"
      >
        <el-select
          v-model="ruleForm.technology"
          placeholder="请选择施工工艺"
          clearable
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
      
      <!-- 建成年份 -->
      <el-form-item
        label="建成年份"
        prop="year"
      >
        <el-input 
          v-model="ruleForm.year" 
          placeholder="请输入建成年份（如：2023）"
          clearable
        />
      </el-form-item>
      
      <!-- 所在地点 -->
      <el-form-item
        label="所在地点"
        prop="location"
      >
        <el-input
          v-model="ruleForm.location"
          type="textarea"
          :rows="2"
          placeholder="请输入桥梁所在地点"
        />
      </el-form-item>

      <!-- 文件上传区域 -->
      <div class="upload-section">
        <label class="upload-label">
          <span class="label-icon">📁</span>
          批量导入（可选）
        </label>
        
        <div
          class="upload-box"
          :class="{ 'is-dragover': isDragover }"
          @dragover.prevent="isDragover = true"
          @dragleave.prevent="isDragover = false"
          @drop.prevent="handleDrop"
          @click="triggerFile"
        >
          <input
            ref="fileInput"
            type="file"
            accept=".xlsx,.csv"
            style="display:none"
            @change="handleFile"
          >

          <div class="upload-content">
            <div class="upload-icon-wrapper">
              {{ uploadedFile ? '✅' : '📥' }}
            </div>
            <p class="upload-main-text">
              {{ uploadedFile ? uploadedFile.name : '点击或拖拽文件到此处上传' }}
            </p>
            <p class="upload-hint">
              支持 xlsx、csv 格式文件
            </p>
          </div>
        </div>
      </div>
       
      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button 
          type="primary" 
          class="submit-btn"
          :loading="isSubmitting"
          @click="submitForm"
        >
          {{ isSubmitting ? '提交中...' : '提交数据' }}
        </el-button>
        <el-button 
          class="reset-btn"
          @click="resetForm"
        >
          重置表单
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

const ruleFormRef = ref(null)
const fileInput = ref(null)
const uploadedFile = ref(null)
const isDragover = ref(false)
const isSubmitting = ref(false)

const ruleForm = reactive({
  name: '',
  type: '',
  technology: '',
  year: '',
  location: ''
})

const rules = reactive({
  name: [
    { required: true, message: '请输入桥梁名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择桥梁类型', trigger: 'change' }
  ],
  technology: [
    { required: true, message: '请选择施工工艺', trigger: 'change' }
  ],
  year: [
    { required: true, message: '请输入建成年份', trigger: 'blur' },
    { pattern: /^\d{4}$/, message: '请输入有效的年份（如：2023）', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请输入所在地点', trigger: 'blur' }
  ]
})

const triggerFile = () => {
  fileInput.value.click()
}

const handleFile = (e) => {
  const file = e.target.files[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (e) => {
  isDragover.value = false
  const file = e.dataTransfer.files[0]
  if (file) {
    processFile(file)
  }
}

const processFile = (file) => {

  
  const ext = file.name.split('.').pop().toLowerCase()
  if (!['xlsx', 'xls', 'csv'].includes(ext)) {
    ElMessage.error('请上传 xlsx、xls 或 csv 格式的文件')
    return
  }
  
  uploadedFile.value = file
  ElMessage.success(`已选择文件: ${file.name}`)
  
  // 读取Excel文件内容
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(firstSheet)
      console.log('Excel数据预览:', jsonData)
      
      // 如果有数据，可以自动填充表单或批量导入
      if (jsonData.length > 0) {
        ElMessage.info(`检测到 ${jsonData.length} 条数据，可以进行批量导入`)
      }
    } catch (error) {
      ElMessage.error('读取文件失败：' + error.message)
    }
  }
  reader.readAsArrayBuffer(file)
}

const submitForm = async () => {
  if (!ruleFormRef.value) return
  
  await ruleFormRef.value.validate((valid) => {
    if (valid) {
      isSubmitting.value = true
      
      // 模拟提交
      setTimeout(() => {
        ElMessage.success('数据提交成功！')
        isSubmitting.value = false
        resetForm()
      }, 1000)
    } else {
      ElMessage.error('请完善表单信息')
      return false
    }
  })
}

const resetForm = () => {
  if (ruleFormRef.value) {
    ruleFormRef.value.resetFields()
  }
  uploadedFile.value = null
  ruleForm.name = ''
  ruleForm.type = ''
  ruleForm.technology = ''
  ruleForm.year = ''
  ruleForm.location = ''
}
</script>

<style lang="less" scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
}

.form-header {
  margin-bottom: 30px;
}

.form-title {
  display: flex;
  gap: 10px;
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 600;
  color: #f1f5f9;
  
  .title-icon {
    font-size: 24px;
  }
}

.form-subtitle {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

/* 表单样式 */
.bridge-form {
  :deep(.el-form-item__label) {
    color: #94a3b8;
    font-weight: 500;
  }
  
  :deep(.el-input__wrapper),
  :deep(.el-textarea__inner) {
    background: rgba(15, 23, 42, 0.6) !important;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: none;
    
    &:hover {
      border-color: rgba(56, 189, 248, 0.5);
    }
    
    &:focus {
      border-color: #38bdf8;
      box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
    }
  }
  
  :deep(.el-input__inner),
  :deep(.el-textarea__inner) {
    color: #f1f5f9;
    
    &::placeholder {
      color: #64748b;
    }
  }
  
  :deep(.el-select) {
    width: 100%;
  }
  
  :deep(.el-select__wrapper) {
    background: rgba(15, 23, 42, 0.6) !important;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: none !important;
  }
}

/* 上传区域 */
.upload-section {
  margin: 25px 0;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #94a3b8;
  
  .label-icon {
    font-size: 16px;
  }
}

.upload-box {
  border: 2px dashed rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: rgba(15, 23, 42, 0.4);
  transition: all 0.3s;
  
  &:hover {
    border-color: #38bdf8;
    background: rgba(56, 189, 248, 0.05);
  }
  
  &.is-dragover {
    border-color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    transform: scale(1.02);
  }
}

.upload-content {
  .upload-icon-wrapper {
    font-size: 48px;
    margin-bottom: 15px;
  }
  
  .upload-main-text {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 500;
    color: #f1f5f9;
  }
  
  .upload-hint {
    margin: 0;
    font-size: 12px;
    color: #64748b;
  }
}

/* 按钮 */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
}

.submit-btn {
  flex: 1;
  height: 44px;
  background: linear-gradient(135deg, #38bdf8, #0ea5e9) !important;
  border: none !important;
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
    transform: translateY(-2px);
  }
}

.reset-btn {
  flex: 1;
  height: 44px;
  background: rgba(148, 163, 184, 0.1) !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  color: #94a3b8;
  font-size: 15px;
  
  &:hover {
    background: rgba(148, 163, 184, 0.2) !important;
    color: #f1f5f9;
  }
}
</style>