// chartGetter.js - 朝代图表相关 getter

export default {
  // ✅ 朝代图表数据
  chartDataset(state) {
    return state.dataset
  },

  // ✅ 按桥梁类型分组的数据
  groupedByType(state) {
    const result = {}
    state.dataset.slice(1).forEach(row => {
      result[row[0]] = row.slice(1)
    })
    return result
  },

  // ✅ 按朝代分组的数据
  groupedByDynasty(state) {
    const dynasties = state.dataset[0].slice(1)
    return dynasties.map((dynasty, i) => ({
      dynasty,
      data: state.dataset.slice(1).map(row => ({ type: row[0], count: row[i + 1] }))
    }))
  },

  // ✅ 获取年份趋势数据（用于时间轴图表）
  yearTrendData() {
    const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥']
    
    // 返回趋势数据
    return bridgeTypes.map(type => ({
      type,
      trend: [10, 50, 100] // 示例趋势数据
    }))
  }
}
