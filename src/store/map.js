import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    // 全国数据
    chinaData: [
      { name: '北京市', value:'' },
      { name: '天津市', value: 289 },
      { name: '河北省', value: '' },
      { name: '山西省', value: 312 },
      { name: '内蒙古自治区', value: 198 },
      { name: '辽宁省', value: '' },
      { name: '吉林省', value: 267 },
      { name: '黑龙江省', value: 358 },
      { name: '上海市', value: '' },
      { name: '江苏省', value: 521 },
      { name: '浙江省', value: 51 },
      { name: '安徽省', value: ''},
      { name: '福建省', value: ''},
      { name: '江西省', value: 289 },
      { name: '山东省', value: ''},
      { name: '河南省', value: '' },
      { name: '湖北省', value: 396 },
      { name: '湖南省', value: 370 },
      { name: '广东省', value: '' },
      { name: '广西壮族自治区', value: '' },
      { name: '海南省', value: '' },
      { name: '重庆市', value: 275 },
      { name: '四川省', value: 300 },
      { name: '贵州省', value: 264 },
      { name: '云南省', value: '' },
      { name: '西藏自治区', value: 115 },
      { name: '陕西省', value: '' },
      { name: '甘肃省', value: 233 },
      { name: '青海省', value: 146 },
      { name: '宁夏回族自治区', value: 162 },
      { name: '新疆维吾尔自治区', value: 298 }
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
      ],
      湖南省: [
        { name: '长沙市', value: 20 },
        { name: '张家界市', value: 60 }
      ],
      北京市: [
        {}
      ],
      天津市: [
        {}
      ],
      河北省: [
        {}
      ],
      山西省: [
        {}
      ],
      内蒙古自治区: [
        {}
      ],
      辽宁省: [
        {}
      ],
      吉林省: [
        {}
      ],
      黑龙江省: [
        {}
      ],
      上海市: [
        {}
      ],
      江苏省: [
        {}
      ],
      安徽省: [
        {}
      ],
      福建省: [
        {}
      ],
      江西省: [
        {}
      ],
      山东省: [
        {}
      ],
      河南省: [
        {}
      ],
      湖北省: [
        {}
      ],
      广西壮族自治区: [
        {}
      ],
      海南省: [
        {}
      ],
      重庆市: [
        {}
      ],
      四川省: [
        {}
      ],
      贵州省: [
        {}
      ],
      云南省: [
        {}
      ],
      西藏自治区: [
        {}
      ],
      陕西省:[
        {}
      ],
      甘肃省: [
        {}
      ],
      青海省:[
        {}
      ],
      宁夏回族自治区: [
        {}
      ],
      新疆维吾尔自治区: [
        {}
      ]
    },
    provinceCodeMap:{
      '北京市': '110000',
      '天津市': '120000',
      '河北省': '130000',
      '山西省': '140000',
      '内蒙古自治区': '150000',
      '辽宁省': '210000',
      '吉林省': '220000',
      '黑龙江省': '230000',
      '上海市': '310000',
      '江苏省': '320000',
      '浙江省': '330000',
      '安徽省': '340000',
      '福建省': '350000',
      '江西省': '360000',
      '山东省': '370000',
      '河南省': '410000',
      '湖北省': '420000',
      '湖南省': '430000',
      '广东省': '440000',
      '广西壮族自治区': '450000',
      '海南省': '460000',
      '重庆市': '500000',
      '四川省': '510000',
      '贵州省': '520000',
      '云南省': '530000',
      '西藏自治区': '540000',
      '陕西省': '610000',
      '甘肃省': '620000',
      '青海省': '630000',
      '宁夏回族自治区': '640000',
      '新疆维吾尔自治区': '650000'
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