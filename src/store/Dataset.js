import { defineStore } from 'pinia'
import axios from 'axios'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    list: [],
    currentType: '',
    keyword: '',

    total: 0,
    page: 1,
    pageSize: 15,
    totalPages: 0
  }),

  actions: {
    // 获取分页数据
    async fetchData(page = 1) {
      try {
        const res = await axios.get('http://localhost:3000/bridges', {
          params: {
            page,
            pageSize: this.pageSize,
            keyword: this.keyword,
            type: this.currentType
          }
        })

        this.list = res.data.list
        this.total = res.data.total
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.totalPages = res.data.totalPages

      } catch (err) {
        console.error('获取数据失败:', err)
      }
    },

    // 设置类型筛选
    setType(type) {
      this.currentType = type
      this.fetchData(1)
    },

    // 设置搜索
    setKeyword(keyword) {
      this.keyword = keyword
      this.fetchData(1)
    },

    init() {
      this.fetchData()
    }
  }
})