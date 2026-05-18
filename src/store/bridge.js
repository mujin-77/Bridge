import { defineStore } from 'pinia'
import bridgesData from '../mock/bridges.json'
import { ElMessage } from 'element-plus'
import { getBridges, addBridge as apiAddBridge, updateBridge as apiUpdateBridge, deleteBridge as apiDeleteBridge } from '../utils/api/bridge.js'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    rawData: [], // 初始为空，由 fetchList 从后端加载
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

    // 从后端加载全部桥梁数据（刷新页面后保持持久化）
    async fetchList(params = {}) {
      try {
        const res = await getBridges({ pageSize: 99999, ...params })
        if (res.data && res.data.code === 200 && res.data.data && res.data.data.list) {
          this.rawData = res.data.data.list
          return
        }
        if (res.data && Array.isArray(res.data)) {
          this.rawData = res.data
          return
        }
      } catch (err) {
        console.warn('后端接口请求失败，使用 mock 数据:', err.message)
      }
      // 后端不可用时降级到本地 mock 数据
      if (this.rawData.length === 0) {
        this.rawData = [...bridgesData]
      }
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
    async updateBridge(id, data) {
      try {
        await apiUpdateBridge(id, data)
        // 后端成功，同步更新本地
        const index = this.rawData.findIndex(item => item.id === id)
        if (index !== -1) {
          this.rawData[index] = { ...this.rawData[index], ...data }
        }
        ElMessage.success('更新成功')
      } catch (err) {
        console.warn('后端未连接，数据仅保存在本次会话中:', err.message)
        ElMessage.warning('后端未连接，数据仅保存在本次会话中')
        // 降级到本地操作
        const index = this.rawData.findIndex(item => item.id === id)
        if (index !== -1) {
          this.rawData[index] = { ...this.rawData[index], ...data }
        }
      }
    },

    // 删除桥梁
    async deleteBridge(id) {
      try {
        await apiDeleteBridge(id)
        this.rawData = this.rawData.filter(item => item.id !== id)
        ElMessage.success('删除成功')
      } catch (err) {
        console.warn('后端未连接，数据仅保存在本次会话中:', err.message)
        ElMessage.warning('后端未连接，数据仅保存在本次会话中')
        // 降级到本地操作
        this.rawData = this.rawData.filter(item => item.id !== id)
      }
    },

    // 添加桥梁
    async addBridge(data) {
      try {
        const res = await apiAddBridge(data)
        if (res.data) {
          this.rawData.push(res.data)
        }
        ElMessage.success('添加成功')
      } catch (err) {
        console.warn('后端未连接，数据仅保存在本次会话中:', err.message)
        ElMessage.warning('后端未连接，数据仅保存在本次会话中')
        // 降级到本地操作
        this.rawData.push({
          id: Date.now(),
          ...data
        })
      }
    }
  }
})
