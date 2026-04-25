import { defineStore } from 'pinia'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    list: [],
    currentType: '',
    allData: [
      {
        'id': 1,
        'name': '赵州桥',
        'dynasty': '隋朝',
        'year': 605,
        'province': '河北',
        'location': '河北赵县',
        'type': '石拱桥',
        'length': 64.4,
        'span': 37.02,
        'material': '石材'
      },
      {
        'id': 2,
        'name': '卢沟桥',
        'dynasty': '金朝',
        'year': 1189,
        'province': '北京',
        'location': '北京丰台',
        'type': '石拱桥',
        'length': 266.5,
        'span': 21.3,
        'material': '石材'
      },
      {
        'id': 3,
        'name': '广济桥',
        'dynasty': '宋朝',
        'year': 1171,
        'province': '广东',
        'location': '广东潮州',
        'type': '梁桥',
        'length': 518,
        'span': 24.0,
        'material': '石材'
      },
    
    ],
  }),

  actions: {
    // 按类型筛选
    // async setType(type) {
    // const res = await getBridgeList(type)
    // this.list=res
 
    setType(type) {
      if (type === '全部') {
        this.list = this.allData
      } else {
        this.list = this.allData.filter(i => i.type === type)
      }
    }
  }
})