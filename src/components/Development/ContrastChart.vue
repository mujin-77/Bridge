<template>
  <div>
    <div class="controls">
      <select v-model="typeA">
        <option
          v-for="t in bridgeTypes"
          :key="t"
        >
          {{ t }}
        </option>
      </select>

      <span> VS </span>

      <select v-model="typeB">
        <option
          v-for="t in bridgeTypes"
          :key="t"
        >
          {{ t }}
        </option>
      </select>
    </div>

    <div
      ref="chartRef"
      class="chart"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart

const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥']

const typeA = ref('梁式桥')
const typeB = ref('拱式桥')

// 多指标数据（0-100评分）
const dataMap = {
  梁式桥: [80, 70, 60, 90, 85],
  拱式桥: [85, 75, 65, 70, 80],
  悬索桥: [95, 80, 90, 50, 60],
  斜拉桥: [90, 85, 88, 60, 65]
}

// 指标
const indicators = ['稳定性', '排水性', '抗震性', '造价', '维护成本']

function updateChart() {
  const series = [
    {
      name: typeA.value,
      type: 'bar',
      stack: 'total',
      data: dataMap[typeA.value]
    },
    {
      name: typeB.value,
      type: 'bar',
      stack: 'total',
      data: dataMap[typeB.value]
    }
  ]

  // ✅ 圆角处理（你原来的逻辑改造版）
  const stackInfo = {}
  for (let i = 0; i < indicators.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = { stackEnd: [] }
      }
      const info = stackInfo[stackName]
      if (series[j].data[i] != null) {
        info.stackEnd[i] = j
      }
    }
  }

  for (let i = 0; i < series.length; ++i) {
    const info = stackInfo[series[i].stack]
    for (let j = 0; j < indicators.length; ++j) {
      const isEnd = info.stackEnd[j] === i
      series[i].data[j] = {
        value: series[i].data[j],
        itemStyle: {
          borderRadius: isEnd ? [10, 10, 0, 0] : [0, 0, 0, 0]
        }
      }
    }
  }

  chart.setOption({
    tooltip: { trigger: 'axis' },

    legend: {
      bottom: 10
    },

    xAxis: {
      type: 'category',
      data: indicators
    },

    yAxis: {
      max: 100
    },

    series
  })
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  updateChart()
})

watch([typeA, typeB], updateChart)
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}

.controls {
  margin-bottom: 10px;
}
</style>