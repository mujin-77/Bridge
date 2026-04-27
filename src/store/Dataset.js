import { defineStore } from 'pinia'
import { getBridges } from '@/utils/api/bridge'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    list: [],
    allData: [],

    currentType: '',
    keyword: '',

    page: 1,
    pageSize: 15,
    total: 0,
    totalPages: 0
  }),

  actions: {
    // 获取分页数据
    async fetchData(page = 1) {
      try {
        const res = await getBridges({
          page,
          pageSize: this.pageSize,
          type: this.currentType === '全部' ? '' : this.currentType,
          keyword: this.keyword
        })

        const data = res.data

        this.list = data.list
        this.allData = data.list

        this.page = data.page
        this.pageSize = data.pageSize
        this.total = data.total
        this.totalPages = data.totalPages
      } catch (err) {
        console.error('获取数据失败:', err)
      }
    },

    // 类型筛选
    setType(type) {
      this.currentType = type
      this.fetchData(1)
    },

    // 搜索
    setKeyword(keyword) {
      this.keyword = keyword
      this.fetchData(1)
    },

    // 分页
    changePage(page) {
      this.fetchData(page)
    },

    init() {
      this.fetchData()
    }
  }
})