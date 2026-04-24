<template>
  <div class="map-container">
    <button
      v-if="isDrillDown"
      class="back-btn"
      @click="goBack"
    >
      返回全国
    </button>

    <div
      ref="chartRef"
      class="map-chart"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'
import { useMapStore } from '@/store/map'

const chartRef = ref(null)
let chart = null

// 状态
const isDrillDown = ref(false)

// ================= 初始化 =================
const initChart = async () => {
  if (chart) {
    chart.dispose()
  }

  await nextTick() // 确保DOM渲染完成

  chart = echarts.init(chartRef.value)

  // 暴露给首页做地图联动
  window.mapChart = chart

  window.addEventListener('resize', resizeChart)
}

// ================= resize =================
const resizeChart = () => {
  chart && chart.resize()
}

// ================= 数据 =================
const mapStore = useMapStore()

const fetchData = async (level) => {
  if (level === 'china') {
    return mapStore.getChinaData
  } else {
    return mapStore.getProvinceData(level)
  }
}

// ================= 地图加载 =================
const mapCache = new Set()

const loadMap = async (mapName, url) => {
  if (mapCache.has(mapName)) return

  chart.showLoading()

  const res = await fetch(url)
  const geoJSON = await res.json()

  echarts.registerMap(mapName, geoJSON)
  mapCache.add(mapName)

  chart.hideLoading()
}

// ================= 配置 =================
const getOption = (mapName, data) => ({
  title: {
    text: mapName === 'china' ? '全国桥梁分布' : `${mapName}桥梁分布`,
    left: 'center',
    top:30,
    textStyle: {
      color: '#f87171',
      fontSize: 20
    }
  },

  tooltip: {
    trigger: 'item'
  },

  visualMap: {
    min: 0,
    max: 500,
    left: 'left',
    bottom: 20,
    calculable: true,
    textStyle: {
      color: '#e2e8f0'
    },
    inRange: {
      color: ['#fff', '#e99d9d', '#f87171']
    }
  },

  series: [
    {
      name: '桥梁数量',
      type: 'map',
      map: mapName,
      roam: true,

      label: {
        show: true,
        color: '#676767',
        fontSize: 10
      },

      emphasis: {
        label: {
          color: '#676767',
        },
        itemStyle: {
          areaColor: '#f87171'
        }
      },

      data
    }
  ]
})

// ================= 渲染 =================
const renderMap = async (mapName, url) => {
  await loadMap(mapName, url)

  const data = await fetchData(mapName)

  const option = getOption(mapName, data)

  chart.setOption(option, true)
}

// ================= 点击下钻 =================
const bindClick = () => {
  chart.on('click', async (params) => {
    if (isDrillDown.value) return

    const province = params.name

    const data = mapStore.getProvinceData(province)
    if (!data.length) return

    const code = mapStore.getProvinceCode(province)

    isDrillDown.value = true

    await renderMap(
      province,
      `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`
    )
  })
}

// ================= 返回 =================
const goBack = async () => {
  isDrillDown.value = false

  await renderMap(
    'china',
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
  )
}

// ================= 生命周期 =================
onMounted(async () => {
  await initChart()

  await renderMap(
    'china',
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
  )

  bindClick()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chart && chart.dispose()
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}


.map-chart {
  width: 100%;
  height: 600px;
  min-height: 300px;
}

/* 返回按钮（统一红色风格） */
.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  padding: 6px 12px;
  background: rgba(127, 29, 29, 0.6);
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
}

.back-btn:hover {
  background: rgba(248, 113, 113, 0.3);
}
</style>