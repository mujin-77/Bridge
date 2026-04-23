<template>
  <div
    ref="chartRef"
    class="chart"
  />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'
import { useBridgeStore } from '@/store/bridge'

const chartRef = ref(null)
let chartInstance = null

const bridgeStore = useBridgeStore()
const data = bridgeStore.rawData
// 模拟数据（你也可以换成接口请求）

function initChart() {
  chartInstance = echarts.init(chartRef.value)

  const bridgeTypes = [
    '梁式桥',
    '拱式桥',
    '悬索桥',
    '斜拉桥',
    '钢架桥',
    '浮桥'
  ]

  const datasetWithFilters = []
  const seriesList = []

  bridgeTypes.forEach((type) => {
    const datasetId = 'dataset_' + type

    datasetWithFilters.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'Year', gte: 1950 },
            { dimension: 'BridgeType', '=': type }
          ]
        }
      }
    })

    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      name: type,
      showSymbol: false,
      smooth: true,
      endLabel: {
        show: true,
        formatter: (params) => {
          return params.seriesName
        }
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'Year',
        y: 'Count',
        label: ['BridgeType', 'Count'],
        itemName: 'Year',
        tooltip: ['Count']
      }
    })
  })

  const option = {
    animationDuration: 3000,

    title: {
      text: '桥梁结构数量随时间变化'
    },

    tooltip: {
      trigger: 'axis'
    },

    legend: {
      bottom: 10,  
      left: 'center'
    },

    dataset: [
      {
        id: 'dataset_raw',
        source: data
      },
      ...datasetWithFilters
    ],

    xAxis: {
      type: 'category',
      name: '年份'
    },

    yAxis: {
      name: '数量'
    },
    

    grid: {
      right: 140
    },

    series: seriesList
  }

  chartInstance.setOption(option)
}

// 自适应
function resizeChart() {
  chartInstance && chartInstance.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance && chartInstance.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>