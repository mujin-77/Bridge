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
import { useMaterialStore } from '@/store/material'
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
const materialStore = useMaterialStore()

// ================= 配置项 =================
const getOption = (xData, seriesData) => {
  return {
    color: chinaColors,

    title: {
      text: '桥梁结构类型与使用的材料分布',
      textStyle: {
        color: '#f87171'
      },
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        }
      }
    },

    legend: {
      data: seriesData.map(item => item.name),
      bottom: '-5',
      textStyle: {
        color:'#e2e8f0' // 图例文字颜色
      }
    },
    grid: {
      top: '25%',
      left: '8%',
      right: '5%',
      bottom: '20%'
    },


    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
      axisLabel: {
        color: '#fff' //  纵坐标文字颜色
      },
    },

    yAxis: {
      type: 'value',
      name: '材料数量',
      nameTextStyle: {
        color: '#fff' //  名称颜色
      },
      axisLabel: {
        color: '#fff' 
      },
    },

    series: seriesData.map((item, index) => ({
      name: item.name,
      type: 'line',
      stack: 'Total',
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 2,
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: chinaColors[index]
          },
          {
            offset: 1,
            color: 'rgba(15,23,42,1)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: item.data
    }))
  }
}

// ================= 渲染 =================
const renderChart = async () => {
  const { xData, seriesData } = materialStore.getMaterialData
  const option = getOption(xData, seriesData)
  chart.setOption(option, true)
}

// ================= 生命周期 =================
onMounted(async () => {
  initChart()
  await materialStore.fetchMaterialStatistics()
  await renderChart()
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
  margin-top: 10px;
  width: 100%;
  height: 100%; 
  min-height: 0;
}
</style>