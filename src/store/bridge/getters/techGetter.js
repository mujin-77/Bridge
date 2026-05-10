// techGetter.js - 技术相关 getter

export default {
  // ✅ 获取技术数据
  getTechData(state) {
    return state.techData
  },

  // ✅ 技术数据转换为图表格式
  techChartData(state) {
    const { rawData, techNames } = state.techData
    return techNames.map((name, i) => ({
      name,
      data: rawData[i]
    }))
  },

  // ✅ 获取所有技术名称
  techNames(state) {
    return state.techData.techNames
  },

  // ✅ 获取桥梁类型列表
  bridgeTypesInTech(state) {
    return state.techData.xData
  }
}
