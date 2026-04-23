import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    // 全国数据
    chinaData: [
      { name: '北京市', value: 423 },
      { name: '上海市', value: 256 },
      { name: '广东省', value: 489 },
      { name: '浙江省', value: 51 },
      { name: '四川省', value: 300 }
    ],

    // 👉 各省数据（重点）
    provinceData: {
      广东省: [
        { name: '广州市', value: 200 },
        { name: '深圳市', value: 180 },
        { name: '佛山市', value: 100 }
      ],
      浙江省: [
        { name: '杭州市', value: 120 },
        { name: '宁波市', value: 90 }
      ]
    },
    provinceCodeMap: {
      广东省: '440000',
      浙江省: '330000',
      北京市: '110000',
      上海市: '310000'
    }
  }),

  getters: {
    getChinaData: (state) => state.chinaData,

    getProvinceData: (state) => (provinceName) => {
      return state.provinceData[provinceName] || []
    },
    getProvinceCode: (state) => (name) => {
      return state.provinceCodeMap[name]
    },
  }
})