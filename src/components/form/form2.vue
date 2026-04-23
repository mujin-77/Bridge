<template>
  <div class="bg">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-col :span="22">
        <el-form-item
          label="书籍名称"
          prop="name"
        >
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </el-col>
      
      <el-col :span="22">
        <el-form-item
          label="作者"
          prop="name2"
        >
          <el-input v-model="ruleForm.name2" />
        </el-form-item>
      </el-col>

      <el-form-item
        label="出版时间"
        required
      >
        <el-col :span="22">
          <el-form-item prop="date">
            <el-date-picker
              v-model="ruleForm.date"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <div
        class="upload-box"
        @dragover.prevent
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

        <div class="upload-container">
          <p class="upload-icon">
            📥
          </p>
          <p class="upload-text">
            点击或拖拽文件到此上传
          </p>
          <p class="upload-hint">
            一次上传仅允许一个文件，支持 csv、xlsx 等
          </p>
        </div> 
      </div>
       
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
        <el-button @click="resetForm('ruleForm')">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        name2: '',
        date: '',
        delivery: false,
      },
      rules: {
        name: [
          { required: true, message: '请输入桥梁名称', trigger: 'blur' },
          { min: 4, max: 14, message: '长度在 4 到 14 个字符', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    triggerFile() {
      // 通过 this.$refs.fileInput 访问真实 DOM
      this.$refs.fileInput.click()
    },
    handleFile(e) {
      const file = e.target.files[0]
      console.log(file)
      // 这里可以做上传或者读取文件内容
    },
    handleDrop(e) {
      const file = e.dataTransfer.files[0]
      console.log(file)
      // 同样可以做上传或者读取
    },
    
    
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
.bg{
  background: #2c5e7c;
  padding: 20px;
  border-radius: 10px;
}
.demo-ruleForm .el-form-item__label {
  color: #fff; /* label 白色 */
}
.upload-box {
  border: 2px dashed #d9d9d9;
  margin: 25px;
  padding-bottom: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  background: #fafafa;
  transition: 0.3s;

  .upload-box:hover {
    border-color: #409eff;
    background: #f0f7ff;
  }
}
.upload-container {
  color: #666;
}

.upload-icon {
  font-size: 40px;
  margin-bottom: 10px;
}

.upload-text {
  font-size: 12px;
  color: #333;
}

.upload-hint {
  font-size: 10px;
  color: #999;
}
</style>