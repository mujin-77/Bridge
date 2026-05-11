import { defineStore } from 'pinia'
import bridgesData from '../mock/bridges.json'
import { getBridgesByDynasty } from '../utils/api/bridge'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    rawData: [...bridgesData], // 使用 mock 数据副本（避免引用问题）
    currentType: '全部', // 当前筛选类型
    bridgeTypes: ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥']
  }),

  getters: {
    // 根据当前类型过滤的数据
    list(state) {
      if (state.currentType === '全部') {
        return state.rawData
      }
      // 根据桥梁类型关键词匹配
      return state.rawData.filter(item => {
        const type = item.type || ''
        switch (state.currentType) {
          case '梁式桥':
            return type.includes('梁')
          case '拱式桥':
            return type.includes('拱')
          case '悬索桥':
            return type.includes('悬索')
          case '斜拉桥':
            return type.includes('斜拉')
          case '刚架桥':
            return (type.includes('钢') || type.includes('桁')) && !type.includes('斜拉')
          case '浮桥':
            return type.includes('浮')
          default:
            return true
        }
      })
    },

    chartDataset(state) {
      const dynasties = [
        '汉朝',
        '隋朝',
        '唐朝',
        '宋朝',
        '元朝',
        '明朝',
        '清朝',
        '现代'
      ]

      // 数据库朝代名映射到前端朝代
      const dynastyMap = {
        '汉朝': ['汉朝', '西晋'],
        '隋朝': ['隋朝'],
        '唐朝': ['唐朝', '唐代'],
        '宋朝': ['宋朝', '宋代', '北宋', '南宋', '五代十国', '金朝'],
        '元朝': ['元朝', '元代'],
        '明朝': ['明朝', '明代'],
        '清朝': ['清朝', '清代'],
        '现代': ['现代']
      }

      const bridgeTypes = [
        '梁式桥',
        '拱式桥',
        '悬索桥',
        '斜拉桥',
        '刚架桥',
        '浮桥',
        '其他'
      ]

      const result = [['桥梁类型', ...dynasties]]

      bridgeTypes.forEach(type => {
        const row = [type]

        dynasties.forEach(dynasty => {
          const matchedDynasties = dynastyMap[dynasty] || [dynasty]

          const total = state.rawData
            .filter(item => {
              // 朝代匹配（支持多种写法）
              const dynastyMatch = matchedDynasties.includes(item.dynasty)

              let typeMatch = false

              if (type === '梁式桥') {
                typeMatch = item.type.includes('梁')
              }

              if (type === '拱式桥') {
                typeMatch = item.type.includes('拱')
              }

              if (type === '悬索桥') {
                typeMatch = item.type.includes('悬索')
              }

              if (type === '斜拉桥') {
                typeMatch = item.type.includes('斜拉')
              }

              if (type === '刚架桥') {
                typeMatch = item.type.includes('钢') && !item.type.includes('斜拉')
              }

              if (type === '浮桥') {
                typeMatch = item.type.includes('浮')
              }

              if (type === '其他') {
                typeMatch =
                  !item.type.includes('梁') &&
                  !item.type.includes('拱') &&
                  !item.type.includes('悬索') &&
                  !item.type.includes('斜拉') &&
                  !item.type.includes('钢') &&
                  !item.type.includes('浮')
              }

              return dynastyMatch && typeMatch
            })
            .length

          row.push(total)
        })

        result.push(row)
      })

      return result
    }
  },

  actions: {
    // 设置当前筛选类型
    setType(type) {
      this.currentType = type
    },

    // 获取列表数据（直接使用本地数据）
    async fetchList(params = {}) {
      // 数据已经在 state 中通过 bridgesData 加载
      // 如果需要分页，可以在这里处理
    },

    // 获取统计数据
    async fetchStatistics() {
      try {
        const res = await getBridgesByDynasty()
        if (res.data && res.data.length > 0) {
          this.rawData = res.data
        }
        // 接口失败或无数据时，保持使用本地 mock 数据
      } catch (err) {
        console.warn('统计接口请求失败，使用本地 mock 数据:', err.message)
        // 不做任何操作，保留本地 mock 数据
      }
    },

    // 更新桥梁信息
    updateBridge(id, data) {
      const index = this.rawData.findIndex(item => item.id === id)
      if (index !== -1) {
        this.rawData[index] = { ...this.rawData[index], ...data }
      }
    },

    // 删除桥梁
    deleteBridge(id) {
      this.rawData = this.rawData.filter(item => item.id !== id)
    },

    // 添加桥梁
    addBridge(data) {
      this.rawData.push({
        id: Date.now(),
        ...data
      })
    }
  }
})
