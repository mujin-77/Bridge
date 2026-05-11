import { defineStore } from 'pinia'
import { getBridgesByProvince } from '../utils/api/bridge'
import bridgesData from '../mock/bridges.json'


export const useMapStore = defineStore('map', {
  state: () => ({
    // 全国数据
    chinaData: [],

    // 各省数据（重点）
    provinceData: {},
    normalizeProvinceName(name) {
      const map = {
        北京市: '北京',
        天津市: '天津',
        上海市: '上海',
        重庆市: '重庆',

        河北省: '河北',
        山西省: '山西',
        辽宁省: '辽宁',
        吉林省: '吉林',
        黑龙江省: '黑龙江',
        江苏省: '江苏',
        浙江省: '浙江',
        安徽省: '安徽',
        福建省: '福建',
        江西省: '江西',
        山东省: '山东',
        河南省: '河南',
        湖北省: '湖北',
        湖南省: '湖南',
        广东省: '广东',
        海南省: '海南',
        四川省: '四川',
        贵州省: '贵州',
        云南省: '云南',
        陕西省: '陕西',
        甘肃省: '甘肃',
        青海省: '青海',

        内蒙古自治区: '内蒙古',
        广西壮族自治区: '广西',
        宁夏回族自治区: '宁夏',
        新疆维吾尔自治区: '新疆',
        西藏自治区: '西藏'
      }


      return map[name] || name
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
    getCityFromLocation(location) {
      if (!location) return '未知'

      // 提取“xx市”
      const match = 
        location.match(/(.+?市)/)||
        location.match(/(.+?区)/)||
        location.match(/(.+?州)/)
      if (match) return match[1]

      return location
    },
    getProvinceCode: (state) => (name) => {
      return state.provinceCodeMap[name]
    },
  },
  actions: {
    extractAreaName(location) {
      if (!location) return '未知'
      const match = location.match(/([\u4e00-\u9fa5]{2,})/)

      if (!match) return location

      // 去掉省份前缀
      location = location.replace( /^(北京|天津|上海|重庆|河北|山西|辽宁|吉林|黑龙江|江苏|浙江|安徽|福建|江西|山东|河南|湖北|湖南|广东|海南|四川|贵州|云南|陕西|甘肃|青海|台湾|内蒙古|广西|宁夏|新疆|西藏)/,
        '')

      // 如果有连接符，只取前面
      location = location.split('-')[0]
      

      return location
    },
    async fetchMapData() {
      try {
        const provinces = Object.keys(this.provinceCodeMap)

        const chinaList = []
        const provinceMap = {}

        for (const provinceName of provinces) {
          const dbProvince = this.normalizeProvinceName(provinceName)
          const res = await getBridgesByProvince(dbProvince)

          const list = res.data || []

          chinaList.push({
            name: provinceName,
            value: list.length
          })

          const cityMap = {}

          list.forEach(item => {
            const city = this.extractAreaName(item.location)

            if (!cityMap[city]) {
              cityMap[city] = 0
            }

            cityMap[city]++
          })

          provinceMap[provinceName] = Object.entries(cityMap).map(
            ([name, value]) => ({
              name,
              value
            })
          )

          // 没数据也保证存在
          if (!provinceMap[provinceName].length) {
            provinceMap[provinceName] = [{}]
          }
        }

        this.chinaData = chinaList
        this.provinceData = provinceMap

      } catch (err) {
        console.warn('获取地图数据失败，使用本地数据:', err.message)
        // 接口失败时，使用本地 mock 数据
        this.loadLocalMapData()
      }
    },
    
    // 从本地数据加载地图数据
    loadLocalMapData() {
      const provinces = Object.keys(this.provinceCodeMap)
      const chinaList = []
      const provinceMap = {}
      
      // 按省份分组
      const bridgeByProvince = {}
      bridgesData.forEach(bridge => {
        const province = bridge.province
        if (!bridgeByProvince[province]) {
          bridgeByProvince[province] = []
        }
        bridgeByProvince[province].push(bridge)
      })
      
      provinces.forEach(provinceName => {
        const dbProvince = this.normalizeProvinceName(provinceName)
        const list = bridgeByProvince[dbProvince] || []
        
        chinaList.push({
          name: provinceName,
          value: list.length
        })
        
        const cityMap = {}
        list.forEach(item => {
          const city = this.extractAreaName(item.location)
          if (!cityMap[city]) {
            cityMap[city] = 0
          }
          cityMap[city]++
        })
        
        provinceMap[provinceName] = Object.entries(cityMap).map(
          ([name, value]) => ({ name, value })
        )
        
        if (!provinceMap[provinceName].length) {
          provinceMap[provinceName] = [{}]
        }
      })
      
      this.chinaData = chinaList
      this.provinceData = provinceMap
    }
  }

})