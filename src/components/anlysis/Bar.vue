<template>
  <v-chart
    :option="option"
    autoresize
    class="bar-chart"
  />
</template>

<script setup>
import { computed } from 'vue'
import * as echarts from 'echarts'
import { useBridgeStore } from '@/store/anlysis'

const props = defineProps({
  indicator: {
    type: String,
    default: '抗震性'
  }
})

const bridgeStore = useBridgeStore()
const bridgeData = bridgeStore.bridgeData

const option = computed(() => {
  const bridgeNames = Object.keys(bridgeData)

  const values = bridgeNames.map(
    name => bridgeData[name][props.indicator]
  )

  return {
    title: {
      text: `${props.indicator}对比`
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: bridgeNames
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: [
      {
        data: values,
        type: 'bar',
        barWidth: 34,
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              { offset: 0, color: '#6C8EF5' },
              { offset: 1, color: '#8FD3A8' }
            ]
          )

        }
      }
    ]
  }
})
</script>

<style scoped>
.bar-chart {
  width: 100%;
  height: 100%;
}
</style>