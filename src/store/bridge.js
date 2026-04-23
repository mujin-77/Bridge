// store/bridge.js
import { defineStore } from 'pinia'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    rawData: [
      { Year: 1950, BridgeType: '梁式桥', Count: 120 },
      { Year: 1960, BridgeType: '梁式桥', Count: 180 },
      { Year: 1970, BridgeType: '梁式桥', Count: 260 },

      { Year: 1950, BridgeType: '拱式桥', Count: 80 },
      { Year: 1960, BridgeType: '拱式桥', Count: 120 },
      { Year: 1970, BridgeType: '拱式桥', Count: 160 },

      { Year: 1950, BridgeType: '悬索桥', Count: 10 },
      { Year: 1960, BridgeType: '悬索桥', Count: 20 },
      { Year: 1970, BridgeType: '悬索桥', Count: 40 },

      { Year: 1950, BridgeType: '斜拉桥', Count: 5 },
      { Year: 1960, BridgeType: '斜拉桥', Count: 15 },
      { Year: 1970, BridgeType: '斜拉桥', Count: 35 },

      { Year: 1950, BridgeType: '钢架桥', Count: 60 },
      { Year: 1960, BridgeType: '钢架桥', Count: 90 },
      { Year: 1970, BridgeType: '钢架桥', Count: 130 },

      { Year: 1950, BridgeType: '浮桥', Count: 30 },
      { Year: 1960, BridgeType: '浮桥', Count: 50 },
      { Year: 1970, BridgeType: '浮桥', Count: 70 }
    ],
    dataset: [
      ['桥梁类型', '夏', '商', '周', '秦', '汉', '隋', '唐', '宋', '元', '明', '清'],
      ['梁式桥', 10, 15, 20, 30, 50, 80, 120, 160, 180, 200, 220],
      ['拱式桥', 5, 8, 15, 20, 40, 90, 150, 200, 220, 250, 300],
      ['悬索桥', 0, 0, 2, 5, 10, 20, 40, 60, 80, 120, 150],
      ['斜拉桥', 0, 0, 0, 0, 5, 10, 20, 40, 60, 100, 130],
      ['刚架桥', 0, 2, 5, 10, 20, 30, 50, 70, 90, 120, 140],
      ['浮桥', 20, 25, 30, 40, 50, 60, 70, 80, 70, 60, 50]
    ],
  }),

  getters: {
    // 👉 按桥类型分组（做图表很有用）
    groupedData(state) {
      const result = {}

      state.rawData.forEach(item => {
        if (!result[item.BridgeType]) {
          result[item.BridgeType] = []
        }
        result[item.BridgeType].push(item)
      })

      return result
    },
    chartDataset: (state) => state.dataset
  }
})