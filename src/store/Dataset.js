import { defineStore } from 'pinia'
import axios from 'axios'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    list: [],
    currentType: '',
    allData: []
  }),

  actions: {
    // 请求后端数据
    async fetchData() {
      try {
        const res = await axios.get('http://localhost:3000/bridges')
        this.allData = res.data
        this.list = res.data
      } catch (err) {
        console.error('获取数据失败:', err)
      }
    },

    mapBridgeType(type) {
      if (!type) return ''

      if (type.includes('拱')) return '拱式桥'
      if (type.includes('梁')) return '梁式桥'
      if (type.includes('斜拉')) return '斜拉桥'
      if (type.includes('悬索')) return '悬索桥'
      if (type.includes('钢')) return '钢架桥'
      if (type.includes('浮')) return '浮桥'

      return '其他'
    },

    setType(type) {
      this.currentType = type
      this.filterData()
    },

    filterData(keyword = '') {
      this.list = this.allData.filter(item => {
        const matchType =
          !this.currentType ||
          this.currentType === '全部' ||
          this.mapBridgeType(item.type) === this.currentType

        const matchKeyword =
          item.name.includes(keyword) ||
          item.location.includes(keyword)

        return matchType && matchKeyword
      })
    },

    init() {
      this.fetchData()
    }
  }
})