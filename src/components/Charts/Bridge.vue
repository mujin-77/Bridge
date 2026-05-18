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
import bridgesData from '@/mock/bridges.json'
import { chinaTechTheme } from '@/utils/echarts-theme'
echarts.registerTheme('china-tech', chinaTechTheme)

const router = useRouter()
const chartRef = ref(null)
let chart = null

// 在组件内部构建图表数据集，不依赖 store
const dynasties = ['汉朝', '隋朝', '唐朝', '宋朝', '元朝', '明朝', '清朝', '现代']
const dynastyMap = {
  '汉朝': ['汉朝', '西晋'],
  '隋朝': ['隋朝'],
  '唐朝': ['唐朝', '唐代'],
  '宋朝': ['宋朝', '宋代', '北宋', '南宋', '五代十国', '金朝'],
  '元朝': ['元朝', '元代'],
  '明朝': ['明朝', '明代'],
  '清朝': ['清朝', '清代'],
  '现代': ['现代']
}
const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥', '其他']

function buildChartDataset(data) {
  const result = [['桥梁类型', ...dynasties]]
  bridgeTypes.forEach(type => {
    const row = [type]
    dynasties.forEach(dynasty => {
      const matchedDynasties = dynastyMap[dynasty] || [dynasty]
      const total = data.filter(item => {
        const dynastyMatch = matchedDynasties.includes(item.dynasty)
        const t = item.type || ''
        let typeMatch = false
        if (type === '梁式桥') typeMatch = t.includes('梁')
        else if (type === '拱式桥') typeMatch = t.includes('拱')
        else if (type === '悬索桥') typeMatch = t.includes('悬索')
        else if (type === '斜拉桥') typeMatch = t.includes('斜拉')
        else if (type === '刚架桥') typeMatch = (t.includes('钢') || t.includes('桁')) && !t.includes('斜拉')
        else if (type === '浮桥') typeMatch = t.includes('浮')
        else typeMatch = !t.includes('梁') && !t.includes('拱') && !t.includes('悬索') && !t.includes('斜拉') && !t.includes('钢') && !t.includes('浮')
        return dynastyMatch && typeMatch
      }).length
      row.push(total)
    })
    result.push(row)
  })
  return result
}

// 初始化
const initChart = () => {
  chart = echarts.init(chartRef.value, 'china-tech')
}

const resizeChart = () => {
  chart && chart.resize()
}

// 配置
const getOption = (data) => {
  const dataset = buildChartDataset(data)
  return {
    title: {
      text: '桥梁类型发展趋势与占比',
      top: -3,
    },
    legend: {},
    tooltip: {
      trigger: 'axis'
    },
    dataset: { source: dataset },
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
      top: '54%',
      left: '8%',
      right: '5%',
    },
    series: [
      ...dataset.slice(1).map(() => ({
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
  }
}

// 渲染
const renderChart = () => {
  const option = getOption(bridgesData)
  chart.setOption(option, true)

  chart.off('click')
  chart.on('click', (params) => {
    router.push({
      path: '/BridgeTypes',
      query: {
        type: params.seriesName,
        dynasty: params.name
      }
    })
  })

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
onMounted(() => {
  nextTick().then(() => {
    initChart()
    renderChart()
    setTimeout(() => {
      chart && chart.resize()
    }, 200)
  })
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart && chart.dispose()
})
</script>

<style scoped>
.chart-container {
  margin-top: 40px;
  width: 100%;
  height: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
