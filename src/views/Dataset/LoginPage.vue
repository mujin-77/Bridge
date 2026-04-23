<template>
  <!-- 动态背景 -->
  <div class="bg">
    <span />
    <span />
    <span />
    <span />
  </div>
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
    ElMessage.success('登录成功')
    setTimeout(() => {
      go('/Dataset')
    }, 500)
  } else {
    ElMessage.error('账号或密码错误')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  overflow: hidden;
}

/* ===== 动态背景 ===== */

.bg {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at center, #07121f 0%, #020617 80%);
  overflow: hidden;
  z-index: 0;
}

/* 流动光圈 */

.bg span {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.8;
  animation: float 4s infinite linear;
}

/* 红色 */
.bg span:nth-child(1) {
  width: 500px;
  height: 500px;
  background: rgba(248, 113, 113, 0.35);
  top: 10%;
  left: 10%;
}

/* 蓝色 */
.bg span:nth-child(2) {
  width: 500px;
  height: 500px;
  background: rgba(59, 130, 246, 0.3);
  bottom: 10%;
  right: 10%;
  animation-duration: 4s;
}

/* 紫色 */
.bg span:nth-child(3) {
  width: 300px;
  height: 300px;
  background: rgba(168, 85, 247, 0.30);
  top: 50%;
  left: 60%;
  animation-duration: 4s;
}

/* 红色补充 */
.bg span:nth-child(4) {
  width: 350px;
  height: 350px;
  background: rgba(255, 96, 96, 0.30);
  bottom: 20%;
  left: 20%;
  animation-duration: 4s;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(30px, -100px);
  }

  50% {
    transform: translate(-80px, 50px);
  }

  75% {
    transform: translate(80px, 40px);
  }

  100% {
    transform: translate(0, 0);
  }
}

/* ===== 登录框 ===== */

.login-box {
  width: 420px;
  padding: 45px;

  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(14px);

  border: 1px solid rgba(248, 113, 113, 0.25);
  border-radius: 14px;

  box-shadow:
    0 0 40px rgba(255, 255, 255, 0.35),
    0 0 20px rgba(248, 113, 113, 0.08);

  text-align: center;
  color: #fff;
}

/* 标题 */

.login-box h1 {
  margin-bottom: 30px;
  color: #f87171;
  font-size: 30px;
}

/* 输入框 */

.login-box input {
  width: 90%;
  margin: 15px 0;
  padding: 12px;

  background: rgba(255,255,255,0.03);

  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;

  color: white;
  outline: none;
  transition: 0.3s;
}

.login-box input:focus {
  border-color: #f87171;
  box-shadow: 0 0 12px rgba(248,113,113,0.35);
}

/* 按钮 */

.login-box button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;

  border: none;
  border-radius: 8px;

  background: #f87171;
  color: white;

  cursor: pointer;
  transition: 0.3s;
}

.login-box button:hover {
  box-shadow: 0 0 20px rgba(248,113,113,.55);
}

/* tip */

.login-tip {
  position: fixed;
  top: 30px;
  left: 30px;

  z-index: 3;

  padding: 10px 18px;

  background: rgba(15,23,42,.8);
  border: 1px solid rgba(248,113,113,.2);

  color: #fca5a5;
  border-radius: 8px;
}
</style>
