<template>
  <div class="home-container screen">
    <!-- 顶部 -->
    <div class="header">
      <div class="left-area">
        <button @click="go('/HomePage')">
          返回
        </button>
      </div>

      <div class="title">
        中国古代桥梁结构与技术可视化数据大屏
      </div>

      <div class="right-area">
        <div class="time">
          {{ currentTime }}
        </div>
      </div>
    </div>

    <!-- 主体 -->
    <div class="main">
      <div class="left">
        <div class="card">
          <Distribution />
        </div>
        <button @click="go('/comparative_anlysis')">
          数据对比分析
        </button>
      </div>

      <div class="center">
        <div class="card map">
          <Bridge />
        </div>
      </div>

      <div class="right">
        <div class="card">
          <Technology />
        </div>
        <button @click="go('/BridgeTechnology')">
          桥梁工艺著作
        </button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="card">
        <Structure />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount,nextTick } from 'vue'
import { useNavigate } from '@/hooks/useNavigate.js'
const { go,   } = useNavigate()

import Bridge from '@/components/Charts/Bridge.vue'
import Structure from '@/components/Charts/Structure.vue'
import Technology from '@/components/Charts/Technology.vue'
import Distribution from '@/components/Charts/Distribution.vue'

const currentTime = ref('')

let timeTimer = null
const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

let timer = null

onMounted(async() => {
  updateTime()

  await nextTick()
  
  timeTimer = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  clearInterval(timeTimer)
})
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #020617, #001529 60%, #020617),
            linear-gradient(180deg, rgba(153, 27, 27, 0.25), transparent);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
}


.screen {
  .header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    button{
      width: 60px;
    }
  }
  /* 左右区域固定宽度 */
  .left-area,
  .right-area {
    width: 200px;
    display: flex;
    align-items: center;
  }

  /* 左靠 */
  .left-area {
    justify-content: flex-start;
  }

  /* 右靠 */
  .right-area {
    justify-content: flex-end;
  }

  /* 标题居中 */
  .title {
    flex: 1;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #e2e8f0;
    background: none;
    text-shadow: 0 0 12px rgba(248, 113, 113, 1);
  }
  button {
    background: rgba(127, 29, 29, 0.6);
    border: 1px solid rgba(248, 113, 113, 0.3);
    color: #e2e8f0;
    border-radius: 6px;
  }

  button:hover {
    background: rgba(248, 113, 113, 0.2);
  }

  /* 时间 */
  .time {
    color: rgba(248, 113, 113, 0.7);
    font-size: 14px;
    letter-spacing: 2px;
  }

  .main {
    flex: 1;
    display: flex;
    gap: 10px;
    padding: 10px;
  }
  /* 左右缩小 */
  .left {
    flex: 3;
    min-width: 0;
  }

  .center {
    flex: 4; 
    min-width: 0;
  }

  .right {
    flex: 3;
    min-width: 0;
  }
  .card {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  position: relative;

  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(248, 113, 113, 0.25);
  border-radius: 10px;

  transition: 0.3s;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 10px;
  padding: 2px;

  background: linear-gradient(
    90deg,
    transparent,
    #38bdf8,
    transparent
  );

  background-size: 300% 300%;
  animation: borderFlow 4s linear infinite;

  /* 关键：只显示边框 */
  -webkit-mask: 
    linear-gradient(#000 0 0) content-box, 
    linear-gradient(#000 0 0);

  mask: 
    linear-gradient(#000 0 0) content-box, 
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;

  pointer-events: none;
}

/* 动画 */
@keyframes borderFlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
}

.card:hover {
  box-shadow: 
    0 0 20px rgba(248, 113, 113, 0.9),
    0 0 40px rgba(248, 113, 113, 0.6),
    inset 0 0 15px rgba(248, 113, 113, 0.5);

  border-color: #f87171;
}
.card:hover::before {
  opacity: 0;
}
}

.left,
.right {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.time {
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 16px;
  color: #f87171; 
  letter-spacing: 2px;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.6);
}

.center {
  flex: 1;
}

.map {
  height: 100%;
}

.footer {
  height: 500px;
  display: flex;
  gap: 10px;
  padding: 20px;
}



</style>