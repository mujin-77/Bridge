<template>
  <div class="home">
    <!-- 顶部轮播 -->
    <div class="banner">
      <Picture />
    </div>

    <!-- 功能卡片 -->
    <div class="cards">
      <div
        class="card"
        @click="go('/about')"
      >
        <span class="corner lt" />
        <span class="corner rt" />
        <span class="corner lb" />
        <span class="corner rb" />
        <h2>桥梁发展</h2>
        <p>中国桥梁发展状况介绍</p>
      </div>
      <div
        class="card"
        @click="go('/DataScreen')"
      >
        <span class="corner lt" />
        <span class="corner rt" />
        <span class="corner lb" />
        <span class="corner rb" />
        <h2>数据大屏</h2>
        <p>中国古代桥梁结构与技术可视化</p>
      </div>

      <div
        class="card"
        @click="login()"
      >
        <span class="corner lt" />
        <span class="corner rt" />
        <span class="corner lb" />
        <span class="corner rb" />
        <h2>数据集管理</h2>
        <p>需要登录后访问</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNavigate } from '@/hooks/useNavigate.js'
import Picture from '@/components/picture/homepage.vue'
const { go, login,  } = useNavigate()

</script>

<style lang="less" scoped>
.home {
  width: 100%;
  min-height: 100vh;

  background: radial-gradient(circle at center, #020617, #001529 60%, #020617),
              linear-gradient(180deg, rgba(153, 27, 27, 0.15), transparent);
}

.banner {
  background: radial-gradient(circle at center, #020617, #001529);
}

.cards {
  display: flex;
  justify-content: center;
  gap: 120px;
  padding: 40px 20px;
}

.card {
  width: 240px;
  height: 100px;
  background: rgba(15, 23, 42, 0.85);
  color: #e2e8f0;
  padding: 20px;
  cursor: pointer;
  transition: 0.3s;

  border: 1px solid rgba(248, 113, 113, 0.25);
  position: relative;
  overflow: hidden;
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #fff;
  }
  p{
    font-size: 14px;
   color: #cbd5f5;
  }
}
/* 四角 */
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid #f87171;
  pointer-events: none;
}

/* 左上 */
.lt {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

/* 右上 */
.rt {
  top: 0;
  right: 0;
  border-left: none;
  border-bottom: none;
}

/* 左下 */
.lb {
  bottom: 0;
  left: 0;
  border-right: none;
  border-top: none;
}

/* 右下 */
.rb {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}
.card:hover {
  transform: translateY(-20px);
    box-shadow:
    0 0 15px rgba(248, 113, 113, 0.5),
    inset 0 0 10px rgba(248, 113, 113, 0.3);

  border-color: #f87171;
}

.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-box input {
  padding: 8px;
}
</style>
