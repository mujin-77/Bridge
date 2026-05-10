<template>
  <div class="mini-line-container">
    <div
      v-if="title"
      class="mini-header"
    >
      <span class="mini-title">{{ title }}</span>
      <span
        class="mini-trend"
        :class="trend >= 0 ? 'up' : 'down'"
      >
        {{ trend >= 0 ? '↑' : '↓' }} {{ Math.abs(trend) }}%
      </span>
    </div>
    <div class="mini-value">
      <span class="value">{{ value }}</span>
      <span
        v-if="unit"
        class="unit"
      >{{ unit }}</span>
    </div>
    <div
      ref="chartRef"
      class="mini-chart"
    />
    <div class="mini-decoration">
      <span class="dot" />
      <span class="line" />
      <span class="dot" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  value: {
    type: [Number, String],
    default: 0
  },
  unit: {
    type: String,
    default: ''
  },
  trend: {
    type: Number,
    default: 0
  },
  data: {
    type: Array,
    default: () => [120, 200, 150, 80, 70, 110, 130]
  },
  color: {
    type: String,
    default: '#f87171'
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option = {
    grid: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 5
    },
    xAxis: {
      type: 'category',
      show: false,
      data: props.data.map((_, i) => i)
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: 2,
        color: props.color
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: props.color + '60' },
            { offset: 1, color: props.color + '05' }
          ]
        }
      },
      data: props.data
    }]
  }
  
  chart.setOption(option)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart && chart.dispose()
})

const handleResize = () => {
  chart && chart.resize()
}

watch(() => props.data, () => {
  if (chart) {
    chart.setOption({
      xAxis: {
        data: props.data.map((_, i) => i)
      },
      series: [{
        data: props.data
      }]
    })
  }
}, { deep: true })
</script>

<style scoped>
.mini-line-container {
  position: relative;
  padding: 10px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
  border-radius: 8px;
  border: 1px solid rgba(248, 113, 113, 0.15);
  overflow: hidden;
}

.mini-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.mini-title {
  font-size: 11px;
  color: rgba(226, 232, 240, 0.7);
}

.mini-trend {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
}

.mini-trend.up {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.mini-trend.down {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.mini-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.value {
  font-size: 14px;
  font-weight: bold;
  color: #f87171;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.4);
}

.unit {
  font-size: 11px;
  color: rgba(226, 232, 240, 0.6);
}

.mini-chart {
  height: 20px;
}

.mini-decoration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.3;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #f87171;
}

.line {
  width: 20px;
  height: 1px;
  background: linear-gradient(90deg, #f87171, transparent);
}
</style>
