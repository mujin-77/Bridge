// actions.js - 操作方法

export default {
  // ✅ 设置筛选条件
  setFilter(key, value) {
    this.filters[key] = value
  },

  // ✅ 批量设置筛选
  setFilters(filters) {
    this.filters = { ...this.filters, ...filters }
  },

  // ✅ 清空筛选
  clearFilters() {
    this.filters = { type: '', province: '', dynasty: '', material: '' }
  },

  // ✅ 设置类型筛选（兼容 Dataset.vue）
  setType(type) {
    this.filters.type = type === '全部' ? '' : type
  },

  // ✅ 添加桥梁
  addBridge(bridge) {
    this.rawData.push({ ...bridge, id: Date.now() })
  },

  // ✅ 更新桥梁
  updateBridge(id, data) {
    const index = this.rawData.findIndex(b => b.id === id)
    if (index !== -1) {
      this.rawData[index] = { ...this.rawData[index], ...data }
    }
  },

  // ✅ 删除桥梁
  deleteBridge(id) {
    this.rawData = this.rawData.filter(b => b.id !== id)
  },

  // ✅ 设置原始数据（对接后端）
  setRawData(data) {
    this.rawData = data
  },

  // ✅ 设置朝代数据
  setDataset(dataset) {
    this.dataset = dataset
  },

  // ✅ 设置地图数据
  setChinaData(data) {
    this.chinaData = data
  },

  // ✅ 设置省份数据
  setProvinceData(province, data) {
    this.provinceData[province] = data
  },

  // ✅ 设置材料数据
  setMaterialData(data) {
    this.materialData = data
  },

  // ✅ 设置技术数据
  setTechData(data) {
    this.techData = data
  }
}
