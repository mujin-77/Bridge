import { defineStore } from 'pinia'
import { getMaterialStatistics } from '../utils/api/bridge'
import bridgesData from '../mock/bridges.json'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    rawData: []
  }),

  getters: {
    getMaterialData(state) {
      // 数据库中的材料映射
      const materials = [
        '木材',
        '混凝土',
        '石材',
        '钢材',
        '预应力混凝土',
        '钢管混凝土',
        '钢/混凝土'
      ]

      const bridgeTypes = [
        '梁式桥',
        '拱式桥',
        '悬索桥',
        '斜拉桥',
        '刚架桥',
        '浮桥',
        '其他'
      ]

      const seriesData = bridgeTypes.map(type => {
        const data = materials.map(material => {
          const total = state.rawData
            .filter(item => {
              const materialMatch = item.material === material

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

              return materialMatch && typeMatch
            })
            .reduce((sum, item) => sum + item.count, 0)

          return total
        })

        return {
          name: type,
          data
        }
      })

      return {
        xData: materials,
        seriesData
      }
    }
  },

  actions: {
    async fetchMaterialStatistics() {
      try {
        const res = await getMaterialStatistics()
        this.rawData = res.data
      } catch (err) {
        console.warn('获取材料统计数据失败，使用本地数据计算:', err.message)
        // 接口失败时，使用本地 mock 数据计算
        this.rawData = this.calculateLocalMaterialStats(bridgesData)
      }
    },
    
    // 从本地数据计算材料统计
    calculateLocalMaterialStats(bridges) {
      const materials = ['木材', '混凝土', '石材', '钢材', '预应力混凝土', '钢管混凝土', '钢/混凝土']
      const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥', '其他']
      
      const result = []
      
      materials.forEach(material => {
        bridgeTypes.forEach(type => {
          const count = bridges.filter(bridge => {
            const materialMatch = bridge.material === material
            
            let typeMatch = false
            if (type === '梁式桥') typeMatch = bridge.type.includes('梁')
            else if (type === '拱式桥') typeMatch = bridge.type.includes('拱')
            else if (type === '悬索桥') typeMatch = bridge.type.includes('悬索')
            else if (type === '斜拉桥') typeMatch = bridge.type.includes('斜拉')
            else if (type === '刚架桥') typeMatch = bridge.type.includes('钢') && !bridge.type.includes('斜拉')
            else if (type === '浮桥') typeMatch = bridge.type.includes('浮')
            else typeMatch = !bridge.type.includes('梁') && !bridge.type.includes('拱') && 
                           !bridge.type.includes('悬索') && !bridge.type.includes('斜拉') && 
                           !bridge.type.includes('钢') && !bridge.type.includes('浮')
            
            return materialMatch && typeMatch
          }).length
          
          if (count > 0) {
            result.push({ material, type, count })
          }
        })
      })
      
      return result
    }
  }
})