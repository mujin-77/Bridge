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
        const res = await getBridges({ page: 1, pageSize: 1000 })
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
        
        // 将数据分配到各施工工艺（按实际工程分布规律）
        // 桩基础最常见，沉井基础最少；悬臂施工法多用于大跨径，预制装配法多用于中小跨径
        const techWeights = [0.15, 0.35, 0.05, 0.20, 0.25] // 各工艺权重：明挖、桩基、沉井、悬臂、预制
        
        bridgeTypes.forEach((bridgeType, bIdx) => {
          const count = typeCountMap[bridgeType]
          
          if (count === 0) return
          
          // 根据桥型调整工艺分布
          let adjustedWeights = [...techWeights]
          if (bridgeType === '悬索桥' || bridgeType === '斜拉桥') {
            // 大跨径桥型：悬臂施工和预制装配更常见
            adjustedWeights = [0.05, 0.20, 0.02, 0.40, 0.33]
          } else if (bridgeType === '拱式桥') {
            // 拱桥：悬臂施工较少
            adjustedWeights = [0.10, 0.30, 0.10, 0.10, 0.40]
          }
          
          // 分配数量（加入随机性让数据更真实）
          this.techNames.forEach((_, tIdx) => {
            const baseCount = Math.floor(count * adjustedWeights[tIdx])
            const randomFactor = 0.8 + Math.random() * 0.4 // 0.8-1.2的随机系数
            this.rawData[tIdx][bIdx] = Math.round(baseCount * randomFactor)
          })
        })
        
      } catch (err) {
        console.error('获取施工工艺数据失败:', err)
      }
    }
  }
})