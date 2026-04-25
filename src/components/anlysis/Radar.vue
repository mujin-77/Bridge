<template>
  <div style="width: 100%; height: 100%">
    <v-chart
      ref="chartRef"
      :option="option"
      autoresize
      class="radar-chart"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useBridgeStore } from '@/store/anlysis'

const bridgeStore = useBridgeStore()
const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  nextTick(() => {
    chartInstance = chartRef.value?.getEchartsInstance()

    // 监听窗口变化
    window.addEventListener('resize', resizeChart)
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
})

const resizeChart = () => {
  chartInstance?.resize()
}
const props = defineProps({
  bridgeA: {
    type: String,
    default: '悬索桥'
  },
  bridgeB: {
    type: String,
    default: '拱式桥'
  }
})
const bridgeData = bridgeStore.bridgeData

const indicators = [
  { name: '泄洪性', max: 100 },
  { name: '刚度', max: 100 },
  { name: '跨越能力', max: 100 },
  { name: '抗风稳定性', max: 100 },
  { name: '抗震性', max: 100 },
  { name: '资金使用', max: 100 },
]
const option = computed(() => {
  const a = Object.values(bridgeData[props.bridgeA || '悬索桥'])
  const b = Object.values(bridgeData[props.bridgeB || '拱式桥'])

  return {
    color: ['#6C8EF5', '#8FD3A8'],
    title: { text: '桥梁性能对比' },
    legend: { data: [props.bridgeA, props.bridgeB] },
    radar: { indicator: indicators },
    series: [
      {
        type: 'radar',
        areaStyle: {
          opacity: 0.25
        },
        lineStyle: {
          width: 3
        },
        symbolSize: 6,
        data: [
          {
            value: a,
            name: props.bridgeA,
            areaStyle: {
              opacity: 0.35
            }
          },
          {
            value: b,
            name: props.bridgeB,
            areaStyle: {
              opacity: 0.44
            }
          },
        ],
      },
    ],
  }
})
</script>
<style scoped>
.radar-chart {
  width: 100%;
  height: 100%;
}
</style>