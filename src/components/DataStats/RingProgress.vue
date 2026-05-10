<template>
  <div class="progress-ring-container">
    <div
      ref="chartRef"
      class="ring-chart"
    />
    <div class="ring-label">
      <div class="ring-title">
        {{ title }}
      </div>
      <div class="ring-value">
        {{ value }}
      </div>
      <div class="ring-subtitle">
        {{ subtitle }}
      </div>
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
  subtitle: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#f87171'
  },
  percent: {
    type: Number,
    default: 75
  }
})

const chartRef = ref(null)
let chart = null

const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '70%',
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: props.color },
                { offset: 1, color: '#fca5a5' }
              ]
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, 'rgba(248, 113, 113, 0.15)']]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: [props.percent],
        detail: {
          show: false
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut'
      }
    ]
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

watch(() => props.percent, () => {
  if (chart) {
    chart.setOption({
      series: [{
        data: [props.percent]
      }]
    })
  }
})
</script>

<style scoped>
.progress-ring-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 120px;
}

.ring-chart {
  width: 100%;
  height: 100%;
}

.ring-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.ring-title {
  font-size: 10px;
  color: rgba(226, 232, 240, 0.7);
  margin-bottom: 2px;
  white-space: nowrap;
}

.ring-value {
  font-size: 15px;
  font-weight: bold;
  color: #f87171;
  text-shadow: 0 0 8px rgba(248, 113, 113, 0.4);
}

.ring-subtitle {
  font-size: 8px;
  color: rgba(226, 232, 240, 0.5);
  margin-top: 2px;
}
</style>
