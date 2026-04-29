<template>
  <div class="login-tip">
    演示账号: admin | 密码: 123456
  </div>
  <div class="login-container">
    <div class="login-box">
      <h1>系统登录</h1>
      <form @submit.prevent="handleLogin">
        <input
          v-model="username"
          placeholder="用户名"
        >
        <input
          v-model="password"
          type="password"
          placeholder="密码"
        >
        <button type="submit">
          登录
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNavigate } from '@/hooks/useNavigate.js'
import { ElMessage } from 'element-plus'

const { go } = useNavigate()

const username = ref('')
const password = ref('')

const handleLogin = () => {
  if (!username.value || !password.value) {
    ElMessage.warning('请输入账户和密码')
    return
  }
  if (username.value === 'admin' && password.value === '123456') {
    localStorage.setItem('token', 'admin-token')
    localStorage.setItem('role', 'admin')
    ElMessage.success('登录成功，正在跳转...')
    setTimeout(() => {
      go('/Dataset')
    }, 500)
  } else {
    ElMessage.error('账号或密码错误')
  }
}
</script>

<style scoped>
/* 保留原有样式，加上 scoped 避免影响全局 */
.login-tip {
  margin-bottom: 15px;
  padding: 10px;
  background: #fff7e6;
  border: 1px solid #ffd591;
  color: #ad6800;
  border-radius: 4px;
  font-size: 14px;
}
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
}
.login-box {
  width: 400px;
  height: 300px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
}
.login-box input {
  width: 100%;
  margin: 15px 0;
  padding: 10px;
  box-sizing: border-box;
}
.login-box button {
  width: 100%;
  padding: 10px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>