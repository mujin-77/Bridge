import { defineStore } from 'pinia'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    
    materialData: {
      xData: ['钢筋混凝土', '预应力混凝土', '钢材', '石料', '混凝土', '木材', '其他'],

      seriesData: [
        {
          name: '梁式桥',
          data: [220, 180, 150, 300, 260, 120, 80]
        },
        {
          name: '拱式桥',
          data: [100, 120, 90, 400, 300, 150, 60]
        },
        {
          name: '悬索桥',
          data: [80, 150, 200, 20, 60, 10, 30]
        },
        {
          name: '斜拉桥',
          data: [120, 200, 250, 10, 80, 5, 20]
        },
        {
          name: '刚架桥',
          data: [90, 110, 130, 50, 100, 40, 30]
        },
        {
          name: '浮桥',
          data: [30, 20, 40, 200, 150, 300, 100]
        }
      ]
    }
  }),

  getters: {
    getMaterialData: (state) => state.materialData
  }
})