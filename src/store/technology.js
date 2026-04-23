import { defineStore } from 'pinia'

export const useTechStore = defineStore('tech', {
  state: () => ({
    // 👉 原始数据（核心）
    rawData: [
      [120, 100, 80, 60, 90, 140],   // 明挖扩大基础
      [200, 180, 150, 120, 160, 100], // 桩基础
      [80, 60, 50, 40, 70, 30],       // 沉井基础
      [150, 200, 220, 180, 170, 90],  // 悬臂施工法
      [180, 160, 140, 120, 150, 200]  // 预制装配法
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
  }
})