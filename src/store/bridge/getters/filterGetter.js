// filterGetter.js - 筛选相关 getter

export default {
  // ✅ 根据年份计算朝代
  getDynasty(state) {
    return (year) => {
      for (const item of Object.values(state.dynastyMap)) {
        if (year >= item.start && year <= item.end) {
          return item.name
        }
      }
      return '未知'
    }
  },

  // ✅ 获取带完整信息的桥梁列表
  bridgeList(state, getters) {
    return state.rawData.map(bridge => ({
      ...bridge,
      dynasty: getters.getDynasty(bridge.year)
    }))
  },

  // ✅ 获取筛选后的列表（兼容 Dataset.vue）
  list(state) {
    if (!state.filters.type || state.filters.type === '全部') {
      return state.rawData
    }
    return state.rawData.filter(b => b.type === state.filters.type)
  },

  // ✅ 所有桥梁类型
  bridgeTypes(state) {
    return [...new Set(state.rawData.map(b => b.type))]
  },

  // ✅ 所有省份
  provinces(state) {
    return [...new Set(state.rawData.map(b => b.province))]
  },

  // ✅ 所有朝代
  dynasties(state) {
    return Object.values(state.dynastyMap).map(d => d.name)
  },

  // ✅ 所有材料
  materials(state) {
    return [...new Set(state.rawData.map(b => b.material))]
  },

  // ✅ 根据筛选条件过滤
  filteredBridges(state, getters) {
    return state.rawData
      .filter(bridge => {
        if (state.filters.type && bridge.type !== state.filters.type) return false
        if (state.filters.province && bridge.province !== state.filters.province) return false
        if (state.filters.dynasty && getters.getDynasty(bridge.year) !== state.filters.dynasty) return false
        if (state.filters.material && bridge.material !== state.filters.material) return false
        return true
      })
      .map(bridge => ({
        ...bridge,
        dynasty: getters.getDynasty(bridge.year)
      }))
  },

  // ✅ 统计各类型数量
  typeStats(state) {
    const stats = {}
    state.rawData.forEach(bridge => {
      stats[bridge.type] = (stats[bridge.type] || 0) + 1
    })
    return stats
  },

  // ✅ 统计各省份数量
  provinceStats(state) {
    const stats = {}
    state.rawData.forEach(bridge => {
      stats[bridge.province] = (stats[bridge.province] || 0) + 1
    })
    return stats
  },

  // ✅ 统计各朝代数量
  dynastyStats(state, getters) {
    const stats = {}
    state.rawData.forEach(bridge => {
      const dynasty = getters.getDynasty(bridge.year)
      stats[dynasty] = (stats[dynasty] || 0) + 1
    })
    return stats
  }
}
