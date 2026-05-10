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
import { ref, onMounted, onBeforeUnmount, nextTick} from 'vue'
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

  await nextTick()

  chart = echarts.init(chartRef.value)

  window.mapChart = chart

  window.addEventListener('resize', resizeChart)

  bindClick()
}

// ================= resize =================
const resizeChart = () => {
  chart && chart.resize()
}

// ================= 数据 =================
const mapStore = useMapStore()

const fetchData = (level) => {
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
const getOption = (mapName, data) => {
  const maxValue = Math.max(...data.map(i => i.value || 0))
  const isChina = mapName === 'china'

  return {
    title: {
      text: isChina ? '全国桥梁分布' : `${mapName}桥梁分布`,
      left: 'center',
      top: 10,
      textStyle: {
        color: '#f87171',
        fontSize: 14
      }
    },

    tooltip: {
      trigger: 'item'
    },

    visualMap: {
      min: 0,
      max: isChina ? Math.max(maxValue, 200) : Math.max(maxValue, 50),
      left: 'left',
      bottom: 5,
      calculable: true,
      textStyle: {
        color: '#e2e8f0',
        fontSize: 10
      },
      inRange: {
        color: ['#fff5f5', '#fca5a5', '#e95252e9']
      }
    },

    series: [
      {
        name: '桥梁数量',
        type: 'map',
        selectedMode: 'single',
        map: mapName,
        roam: true,

        label: {
          show: true,
          color: '#676767',
          fontSize: 10
        },

        emphasis: {
          label: {
            color: '#111827'
          },
          itemStyle: {
            areaColor: '#feffbe'
          }
        },

        select: {
          label: {
            color: '#000'
          },
          itemStyle: {
            areaColor: '#feffbe'
          }
        },

        data
      }
    ]
  }
}

// ================= 渲染 =================
const renderMap = async (mapName, url) => {
  await loadMap(mapName, url)
  const data = await fetchData(mapName)

  const geoJson = echarts.getMap(mapName).geoJSON
  const mapNames = geoJson.features.map(f => f.properties.name)

  const fixedData = data.map(item => {
    let name = item.name
    if (mapNames.includes(name)) return item
    if (mapNames.includes(name + '市')) return { ...item, name: name + '市' }
    if (mapNames.includes(name + '州')) return { ...item, name: name + '州' }
    const autoStateMatch = mapNames.find(n => n.includes(name) && n.includes('自治州'))
    if (autoStateMatch) return { ...item, name: autoStateMatch }
    return item
  })

  const option = getOption(mapName, fixedData)
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
  await mapStore.fetchMapData()
  await renderMap(
    'china',
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
  )
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
  height: 100%;
}

.back-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  padding: 4px 10px;
  background: rgba(127, 29, 29, 0.6);
  border: 1px solid rgba(248, 113, 113, 0.4);
  color: #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.back-btn:hover {
  background: rgba(248, 113, 113, 0.3);
}
</style>