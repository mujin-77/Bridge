import { defineStore } from 'pinia'
import { getBridges } from '@/utils/api/bridge'

export const useTechStore = defineStore('tech', {
  state: () => ({
    // 👉 原始数据（核心）
    rawData: [
      [0, 0, 0, 0, 0, 0],   // 明挖扩大基础
      [0, 0, 0, 0, 0, 0],   // 桩基础
      [0, 0, 0, 0, 0, 0],   // 沉井基础
      [0, 0, 0, 0, 0, 0],   // 悬臂施工法
      [0, 0, 0, 0, 0, 0]    // 预制装配法
    ],

    // 👉 横坐标
    xData: ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥'],

    // 👉 图例
    techNames: [
      '明挖扩大基础',
      '桩基础',
      '沉井基础',
      '悬臂施工法',
      '预制装配法'
    ]
  }),

  getters: {
    getTechData: (state) => ({
      rawData: state.rawData,
      xData: state.xData,
      techNames: state.techNames
    })
  },

  actions: {
    async fetchTechStatistics() {
      try {
        // 获取所有桥梁数据
        const res = await getBridges({ page: 1, pageSize: 2000 })
        const bridges = res.data.list || []
        
        const bridgeTypes = ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥']
        
        // 初始化 rawData
        this.rawData = this.techNames.map(() => new Array(bridgeTypes.length).fill(0))
        
        // 分类统计
        const typeCountMap = {}
        bridgeTypes.forEach(t => typeCountMap[t] = 0)
        
        bridges.forEach(bridge => {
          const type = bridge.type || ''
          let category = '浮桥' // 默认分类
          
          // 判断桥型分类（按优先级）
          // 1. 先判断钢架桥（包括钢桁架、钢桁梁等钢结构的刚架类型）
          if (type.includes('桁') || type.includes('钢架')) {
            category = '刚架桥'
          } else if (type.includes('钢') && !type.includes('斜拉') && !type.includes('悬索')) {
            category = '刚架桥'  // 其他钢桥（不含斜拉/悬索）
          } else if (type.includes('梁')) {
            category = '梁式桥'
          } else if (type.includes('拱')) {
            category = '拱式桥'
          } else if (type.includes('悬索')) {
            category = '悬索桥'
          } else if (type.includes('斜拉')) {
            category = '斜拉桥'
          } else if (type.includes('浮')) {
            category = '浮桥'
          }
          
          typeCountMap[category]++
        })
        
        // 根据每个桥梁的实际工艺分配数据
        bridges.forEach(bridge => {
          const type = bridge.type || ''
          const tech = bridge.technology || ''
          let category = '浮桥' // 默认分类
          
          // 判断桥型分类（按优先级）
          if (type.includes('桁') || type.includes('钢架')) {
            category = '刚架桥'
          } else if (type.includes('钢') && !type.includes('斜拉') && !type.includes('悬索')) {
            category = '刚架桥'
          } else if (type.includes('梁')) {
            category = '梁式桥'
          } else if (type.includes('拱')) {
            category = '拱式桥'
          } else if (type.includes('悬索')) {
            category = '悬索桥'
          } else if (type.includes('斜拉')) {
            category = '斜拉桥'
          } else if (type.includes('浮')) {
            category = '浮桥'
          }
          
          // 找到对应的工艺索引
          const tIdx = this.techNames.indexOf(tech)
          // 找到对应的桥型索引
          const bIdx = bridgeTypes.indexOf(category)
          
          if (tIdx !== -1 && bIdx !== -1) {
            this.rawData[tIdx][bIdx]++
          }
        })
        
      } catch (err) {
        console.error('获取施工工艺数据失败:', err)
      }
    }
  }
})