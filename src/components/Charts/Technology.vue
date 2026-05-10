<template>
  <div class="chart-container">
    <div
      ref="chartRef"
      class="chart"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { useTechStore } from '@/store/technology'
import { chinaTechTheme,chinaColors } from '@/utils/echarts-theme'
echarts.registerTheme('china-tech', chinaTechTheme)

const chartRef = ref(null)
let chart = null

// ================= 初始化 =================
const initChart = () => {
  chart = echarts.init(chartRef.value,'china-tech')
  window.addEventListener('resize', resizeChart)
}

const resizeChart = () => {
  chart && chart.resize()
}

// ================= 数据 =================
const techStore = useTechStore()

// ================= 计算占比 =================
const calculateSeries = (rawData, techNames) => {
  const totalData = []

  for (let i = 0; i < rawData[0].length; i++) {
    let sum = 0
    for (let j = 0; j < rawData.length; j++) {
      sum += rawData[j][i]
    }
    totalData.push(sum)
  }

  return techNames.map((name, sid) => ({
    name,
    type: 'bar',
    stack: 'total',
    barWidth: '60%',
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: chinaColors[sid % chinaColors.length]
        },
        {
          offset: 1,
          color: 'rgba(15,23,42,0.3)'
        }
      ])
    },
    label: {
      show: true,

      formatter: (params) =>
        totalData[params.dataIndex] === 0
          ? '0%'
          : Math.round(params.value * 1000) / 10 + '%'
    },
    data: rawData[sid].map((d, did) =>
      totalData[did] === 0 ? 0 : d / totalData[did]
    )
  }))
}

// ================= 配置 =================
const getOption = () => {
  const { rawData, xData, techNames } = techStore.getTechData

  const series = calculateSeries(rawData, techNames)

  return {
    title: {
      text: '桥梁类型与施工工艺占比分析',
      top: -3,
      textStyle: {
        color: '#f87171'
      },
    },
    grid: {
      top: '15%',
      left: '15%',
      right: '10%',
      bottom: '20%'
    },
    emphasis: {
      focus: 'series'
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },

    legend: {
      selectedMode: false,
      bottom: '-1',
      textStyle: {
        color: '#fff' // 图例文字颜色
      }
    },

    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        color: '#e2e8f0'
      },
    },

    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        color: '#e2e8f0'
      }
    },

    series
  }
}

// ================= 渲染 =================
const renderChart = () => {
  const option = getOption()
  chart.setOption(option, true) // ✅ 防止数据叠加
}

// ================= 生命周期 =================
onMounted(async () => {
  initChart()
  await techStore.fetchTechStatistics()
  renderChart()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart && chart.dispose()
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}

.chart {
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
</style>