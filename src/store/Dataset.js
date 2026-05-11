import { defineStore } from 'pinia'
import { getBridges } from '../utils/api/bridge'

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

  getters: {
    // 获取当前分类的总数
    filteredTotal: (state) => state.total
  },

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

    // 获取所有数据（用于导出）
    async fetchAllData() {
      try {
        // 循环获取所有页的数据
        const allItems = []
        let currentPage = 1
        let hasMore = true

        while (hasMore) {
          const res = await getBridges({
            page: currentPage,
            pageSize: 100, // 每页获取100条，减少请求次数
            type: this.currentType === '全部' ? '' : this.currentType,
            keyword: this.keyword
          })

          const data = res.data
          allItems.push(...data.list)

          // 如果当前页数据少于100条，或者已经达到总数，说明没有更多数据了
          if (data.list.length < 100 || allItems.length >= data.total) {
            hasMore = false
          } else {
            currentPage++
          }
        }

        return allItems
      } catch (err) {
        console.error('获取全部数据失败:', err)
        return []
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