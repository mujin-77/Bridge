import { defineStore } from 'pinia'
import { getBridgesByDynasty } from '@/utils/api/bridge'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    rawData: []
  }),

  getters: {
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
        '汉朝': ['汉朝', '西晋', '东汉', '西汉', '春秋', '东周', '西周', '秦朝', '商朝'],
        '隋朝': ['隋朝'],
        '唐朝': ['唐朝', '唐代'],
        '宋朝': ['宋朝', '宋代', '北宋', '南宋', '五代十国', '金朝'],
        '元朝': ['元朝', '元代'],
        '明朝': ['明朝', '明代'],
        '清朝': ['清朝', '清代'],
        '现代': ['现代', '近代']
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
            .reduce((sum, item) => sum + item.count, 0)

          row.push(total)
        })

        result.push(row)
      })

      return result
    }
  },

  actions: {
    async fetchStatistics() {
      try {
        const res = await getBridgesByDynasty()
        this.rawData = res.data
      } catch (err) {
        console.error('统计接口失败', err)
      }
    }
  }
})