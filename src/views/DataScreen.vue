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
    <!-- 顶部统计卡片 -->
    <div class="top-stats topchart">
      <StatCard
        label="桥梁总数"
        :value="10.8"
        unit="万座"
        icon="🌉"
        type="default"
        :trend="12"
      />
      <StatCard
        label="涉及省份"
        :value="31"
        unit="个"
        icon="🗺️"
        type="success"
        :trend="5"
      />
      <StatCard
        label="主要桥型"
        :value="5"
        unit="类"
        icon="🏗️"
        type="warning"
      />
      <StatCard
        label="历史跨度"
        :value="2000"
        unit="+年"
        icon="📜"
        type="danger"
      />
    </div>
    <!-- 主体 -->
    <div class="main">
      <div class="left">
        <!-- 左侧顶部统计面板 -->
        <DataPanel title="地区分布统计">
          <div class="stats-row first">
            <StatCard
              label="华北地区"
              :value="286"
              unit="座"
              icon="🏛️"
              type="default"
            />
            <StatCard
              label="华东地区"
              :value="452"
              unit="座"
              icon="🌆"
              type="success"
            />
          </div>
          <div class="stats-row first">
            <StatCard
              label="华南地区"
              :value="325"
              unit="座"
              icon="🌴"
              type="warning"
            />
            <StatCard
              label="西南地区"
              :value="278"
              unit="座"
              icon="🏔️"
              type="danger"
            />
          </div>
        </DataPanel>

        <div class="card">
          <Distribution />
        </div>
        <button @click="go('/comparative_anlysis')">
          数据分析与介绍
        </button>
      </div>

      <div class="center">
        <div class="card map">
          <Bridge />
        </div>
      </div>

      <div class="right">
        <!-- 右侧顶部数据面板 -->
        <DataPanel title="工艺技术统计">
          <div class="ring-row">
            <RingProgress
              title="石拱桥"
              :value="523"
              subtitle="占比33.5%"
              :percent="33.5"
              color="#f87171"
            />
            <RingProgress
              title="木梁桥"
              :value="312"
              subtitle="占比20%"
              :percent="20"
              color="#22c55e"
            />
            <RingProgress
              title="吊桥"
              :value="186"
              subtitle="占比12%"
              :percent="12"
              color="#eab308"
            />
            <RingProgress
              title="廊桥"
              :value="256"
              subtitle="占比16.4%"
              :percent="16.4"
              color="#8b5cf6"
            />
          </div>
        </DataPanel>

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
      <!-- 底部迷你图表面板 -->
      <div class="footer-stats">
        <DataPanel title="年度趋势分析">
          <div class="mini-charts-grid">
            <MiniLine
              title="石拱桥"
              :value="523"
              unit="座"
              :trend="8"
              :data="[120, 132, 101, 134, 90, 230, 210]"
              color="#f87171"
            />
            <MiniLine
              title="木梁桥"
              :value="312"
              unit="座"
              :trend="-3"
              :data="[85, 72, 95, 88, 92, 78, 82]"
              color="#22c55e"
            />
            <MiniLine
              title="吊桥"
              :value="186"
              unit="座"
              :trend="15"
              :data="[45, 52, 48, 55, 62, 71, 68]"
              color="#eab308"
            />
            <MiniLine
              title="廊桥"
              :value="256"
              unit="座"
              :trend="5"
              :data="[68, 72, 65, 78, 85, 82, 88]"
              color="#8b5cf6"
            />
          </div>
        </DataPanel>
      </div>

      <div class="card">
        <Structure />
      </div>

      <!-- 底部右侧指标 -->
      <div class="footer-indicators">
        <DataPanel title="关键指标监控">
          <div class="indicator-item">
            <span class="indicator-label">数据完整度</span>
            <div class="indicator-bar">
              <div
                class="indicator-fill"
                style="width: 96%;"
              />
            </div>
            <span class="indicator-value">96%</span>
          </div>
          <div class="indicator-item">
            <span class="indicator-label">更新频率</span>
            <div class="indicator-bar">
              <div
                class="indicator-fill"
                style="width: 85%;"
              />
            </div>
            <span class="indicator-value">85%</span>
          </div>
          <div class="indicator-item">
            <span class="indicator-label">可视化覆盖率</span>
            <div class="indicator-bar">
              <div
                class="indicator-fill"
                style="width: 92%;"
              />
            </div>
            <span class="indicator-value">92%</span>
          </div>
        </DataPanel>
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

// 导入新增的数据统计组件
import { StatCard, RingProgress, MiniLine, DataPanel } from '@/components/DataStats/index.js'

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

/* 顶部统计卡片区域 */
.top-stats {
  display: flex;
  gap: 15px;
  padding: 8px 20px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.6), transparent);
}

.top-stats > * {
  flex: 1;
}


.screen {
  .header {
    height: 60px;
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
    font-size: 20px;
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
    height: 220px;
    display: flex;
    gap: 10px;
    padding: 8px;
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

/* 左右侧统计面板样式 */
.first{
  height: 50px;
}
.topchart {
  height: 80px;
}
.stats-row {
  display: flex;
  gap: 8px;
}

.stats-row > * {
  flex: 1;
}

.ring-row {
  display: flex;
  height: 100px;
}

.ring-row > * {
  flex: 1;
}

/* 底部样式 */
.footer-stats,
.footer-indicators {
  width: 280px;
  flex-shrink: 0;
}

.mini-charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.indicator-label {
  font-size: 11px;
  color: rgba(226, 232, 240, 0.7);
  width: 80px;
  flex-shrink: 0;
}

.indicator-bar {
  flex: 1;
  height: 6px;
  background: rgba(248, 113, 113, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.indicator-fill {
  height: 100%;
  background: linear-gradient(90deg, #f87171, #fca5a5);
  border-radius: 3px;
  transition: width 0.5s ease;
}

.indicator-value {
  font-size: 12px;
  color: #f87171;
  font-weight: bold;
  width: 35px;
  text-align: right;
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
  height: 260px;
  display: flex;
  gap: 10px;
  padding: 10px 20px;
}



</style>