import { defineStore } from 'pinia'
import { getBridgeList } from '@/api/bridge'

export const useBridgeStore = defineStore('bridge', {
  state: () => ({
    list: [],
    currentType: '',
    allData: [
      { id: 1, 
        name: '南京长江大桥', 
        year: 1968, 
        location: '江苏南京', 
        type: '梁式桥' 
      },
      { id: 2, name: '赵州桥', year: 605, location: '河北赵县', type: '拱式桥' },
      { id: 3, name: '港珠澳大桥', year: 2018, location: '粤港澳', type: '悬索桥' }
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