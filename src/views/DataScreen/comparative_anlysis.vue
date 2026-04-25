<template>
  <div class="layout">
    <!-- 左侧 -->
    <div class="sider">
      <div class="logo">
        数据对比分析
      </div>

      <ul class="menu">
        <li
          class="menu-title"
          @click="toggle('bridge')"
        >
          桥梁结构对比
          <span>{{ openMenu === 'bridge' ? '▶' : '>' }}</span>
        </li>

        <li
          class="menu-title"
          @click="toggle('literature')"
        >
          现代综合性工艺著作
          <span>{{ openMenu === 'literature' ? '▶' : '>' }}</span>
        </li>

        <li
          class="exit"
          @click="back"
        >
          返回数据大屏
        </li>
      </ul>
    </div>

    <!-- 右侧 -->
    <div class="content">
      <!-- 标题 -->
      <div class="header">
        <h2>{{ currentTitle }}</h2>
        <p>{{ currentDesc }}</p>
      </div>

      <!-- 桥梁模块 -->
      

      <div v-if="activeModule === 'bridge'">
        <div class="controls">
          <div>
            桥梁A：
            <select v-model="bridgeA">
              <option
                v-for="item in bridgeList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>

          <div style="margin-left: 20px;">
            桥梁B：
            <select v-model="bridgeB">
              <option
                v-for="item in bridgeList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
          <div style="margin-left:100px;">
            指标：
            <select v-model="selectedIndicator">
              <option
                v-for="item in indicatorList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="chart-card">
            <BridgeRadar
              :bridge-a="bridgeA"
              :bridge-b="bridgeB"
            />
          </div>

          <div class="chart-card">
            <BridgeBar :indicator="selectedIndicator" />
          </div>
        </div>
      </div>

      <!-- 文献模块 -->
      <div v-else>
        <div class="placeholder-card">
          暂无内容（后续开发）
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBridgeStore } from '@/store/anlysis'
import BridgeRadar from '@/components/anlysis/Radar.vue'
import BridgeBar from '@/components/anlysis/Bar.vue'

const router = useRouter()

const back = () => {
  router.push('/DataScreen')
}

/** 模块控制 */
const activeModule = ref('bridge')
const openMenu = ref('bridge')

/** 标题 */
const currentTitle = ref('桥梁结构对比')
const currentDesc = ref('不同桥梁结构性能对比分析')

/** 桥梁选择 */
const bridgeA = ref('悬索桥')
const bridgeB = ref('拱式桥')

const bridgeStore = useBridgeStore()
const bridgeList = bridgeStore.bridgeList
const selectedIndicator = ref('抗震性')

const indicatorList = bridgeStore.indicators
/** 左侧切换 */
const toggle = (key) => {
  activeModule.value = key
  openMenu.value = key

  if (key === 'bridge') {
    currentTitle.value = '桥梁结构对比'
    currentDesc.value = '不同桥梁结构性能对比分析'
  }

  if (key === 'literature') {
    currentTitle.value = '现代综合性工艺著作'
    currentDesc.value = '该模块暂未开发'
  }
}
</script>

<style lang="less" scoped>

.layout {
  display: flex;
  height: 100vh;
  overflow: hidden; // 关键：禁止整体滚动
}

/* 左侧 */
.sider {
  width: 220px;
  height: 100%;
  background: #001529;
  color: #fff;
  padding: 10px;
}

.logo {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

/* 右侧 */

.header {
  color: #000;
  margin-bottom: 20px;
}
.content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  background: #f0f2f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: auto; // 关键：右侧滚动
}


/* 卡片 */
.chart-card {
  flex: 1;
  min-width: 0;
  height: 520px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}
.chart-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  min-height: 520px;
}
.placeholder-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls {
  color: #001529;
  margin-bottom: 20px;
  display: flex;
}
/* 图表 */
.chart-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
</style>