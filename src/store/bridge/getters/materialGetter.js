// materialGetter.js - 材料相关 getter

export default {
  // ✅ 获取材料数据
  getMaterialData(state) {
    return state.materialData
  },

  // ✅ 获取各类型桥梁的材料分布
  materialByType(state) {
    const result = {}
    state.materialData.seriesData.forEach(item => {
      result[item.name] = item.data.reduce((acc, val, i) => {
        acc[state.materialData.xData[i]] = val
        return acc
      }, {})
    })
    return result
  },

  // ✅ 获取所有材料类型
  materialTypes(state) {
    return state.materialData.xData
  }
}
