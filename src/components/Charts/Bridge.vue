<template>
  <div class="chart-container">
    <div
      ref="chartRef"
      class="chart"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useBridgeStore } from '@/store/bridge'
import { chinaTechTheme } from '@/utils/echarts-theme'
echarts.registerTheme('china-tech', chinaTechTheme)

const router = useRouter()
const chartRef = ref(null)
let chart = null

// 初始化
const initChart = () => {
  chart = echarts.init(chartRef.value,'china-tech')
  window.addEventListener('resize', resizeChart)
}

const resizeChart = () => {
  chart && chart.resize()
}

// 数据
const bridgeStore = useBridgeStore()

// 配置
const getOption = () => ({
  title: {
    text: '桥梁类型发展趋势与占比',
    top: 0,
  },

  legend: {
  },

  tooltip: {
    trigger: 'axis'
  },

  dataset: {
    source: bridgeStore.chartDataset
  },

  xAxis: {
    type: 'category',
    axisLabel: { color: '#e2e8f0' }
  },

  yAxis: {
    type: 'value',
    name: '数量',
    nameTextStyle: { color: '#fff' },
    axisLabel: { color: '#e2e8f0' }
  },

  grid: {
    top: '55%'
  },

  series: [
    ...((bridgeStore.chartDataset || []).slice(1)).map(() => ({
      type: 'line',
      smooth: true,
      seriesLayoutBy: 'row',
      emphasis: { focus: 'series' }
    })),

    {
      type: 'pie',
      id: 'pie',
      radius: '30%',
      center: ['50%', '25%'],
      label: {
        formatter: '{b}: {@汉朝} ({d}%)'
      },
      encode: {
        itemName: '桥梁类型',
        value: '汉朝',
        tooltip: '汉朝'
      }
    }
  ]
})

// 渲染
const renderChart = () => {
  const option = getOption()
  chart.setOption(option)

  //  防止重复绑定
  chart.off('click')

  chart.on('click', (params) => {
    console.log('点击:', params)

    router.push({
      path: '/BridgeTypes',
      query: {
        type: params.seriesName,
        dynasty: params.name
      }
    })
  })

  // 联动
  chart.on('updateAxisPointer', (event) => {
    const xAxisInfo = event.axesInfo[0]

    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1

      chart.setOption({
        series: {
          id: 'pie',
          label: {
            formatter: `{b}: {@[${dimension}]} ({d}%)`
          },
          encode: {
            value: dimension,
            tooltip: dimension
          }
        }
      })
    }
  })
}

// 生命周期
onMounted(async () => {
  await nextTick()
  await bridgeStore.fetchStatistics()
  initChart()
  renderChart()
  

  setTimeout(() => {
    chart.resize()  
  }, 200)
  window.addEventListener('resize', resizeChart)
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
  width: 100%;
  height: 100%;
  margin-top: 25px;
}
</style>