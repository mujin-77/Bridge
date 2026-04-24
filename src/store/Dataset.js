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
      {
        'id': 4,
        'name': '安平桥',
        'dynasty': '宋朝',
        'year': 1138,
        'province': '福建',
        'location': '福建泉州',
        'type': '石梁桥',
        'length': 2255,
        'span': 12.5,
        'material': '石材'
      },
      {
        'id': 5,
        'name': '洛阳桥',
        'dynasty': '宋朝',
        'year': 1053,
        'province': '福建',
        'location': '福建泉州',
        'type': '石梁桥',
        'length': 834,
        'span': 16.0,
        'material': '石材'
      },
      {
        'id': 6,
        'name': '玉带桥',
        'dynasty': '清朝',
        'year': 1751,
        'province': '北京',
        'location': '北京颐和园',
        'type': '石拱桥',
        'length': 49.7,
        'span': 11.0,
        'material': '石材'
      },
      {
        'id': 7,
        'name': '五亭桥',
        'dynasty': '清朝',
        'year': 1757,
        'province': '江苏',
        'location': '江苏扬州',
        'type': '拱桥',
        'length': 57.5,
        'span': 15.0,
        'material': '石材'
      },
      {
        'id': 8,
        'name': '十七孔桥',
        'dynasty': '清朝',
        'year': 1764,
        'province': '北京',
        'location': '北京颐和园',
        'type': '石拱桥',
        'length': 150,
        'span': 8.0,
        'material': '石材'
      },
      {
        'id': 9,
        'name': '风雨桥',
        'dynasty': '明朝',
        'year': 1465,
        'province': '贵州',
        'location': '贵州黎平',
        'type': '廊桥',
        'length': 64,
        'span': 18.0,
        'material': '木材'
      },
      {
        'id': 10,
        'name': '程阳永济桥',
        'dynasty': '清朝',
        'year': 1912,
        'province': '广西',
        'location': '广西三江',
        'type': '廊桥',
        'length': 77.6,
        'span': 15.0,
        'material': '木材'
      },
      {
        'id': 11,
        'name': '灞桥',
        'dynasty': '汉朝',
        'year': -100,
        'province': '陕西',
        'location': '陕西西安',
        'type': '木桥',
        'length': 180,
        'span': 10.0,
        'material': '木材'
      },
      {
        'id': 12,
        'name': '虹桥',
        'dynasty': '宋朝',
        'year': 1100,
        'province': '河南',
        'location': '河南开封',
        'type': '木拱桥',
        'length': 50,
        'span': 20.0,
        'material': '木材'
      },
      {
        'id': 13,
        'name': '宝带桥',
        'dynasty': '唐朝',
        'year': 816,
        'province': '江苏',
        'location': '江苏苏州',
        'type': '石拱桥',
        'length': 317,
        'span': 7.0,
        'material': '石材'
      },
      {
        'id': 14,
        'name': '广润桥',
        'dynasty': '明朝',
        'year': 1405,
        'province': '浙江',
        'location': '浙江绍兴',
        'type': '石拱桥',
        'length': 92,
        'span': 14.0,
        'material': '石材'
      },
      {
        'id': 15,
        'name': '放生桥',
        'dynasty': '明朝',
        'year': 1571,
        'province': '上海',
        'location': '上海青浦',
        'type': '石拱桥',
        'length': 72,
        'span': 10.0,
        'material': '石材'
      },
      {
        'id': 16,
        'name': '万安桥',
        'dynasty': '北宋',
        'year': 1059,
        'province': '福建',
        'location': '福建泉州',
        'type': '梁桥',
        'length': 360,
        'span': 18.0,
        'material': '石材'
      },
      {
        'id': 17,
        'name': '永通桥',
        'dynasty': '唐朝',
        'year': 700,
        'province': '河北',
        'location': '河北赵县',
        'type': '石拱桥',
        'length': 87,
        'span': 26.0,
        'material': '石材'
      },
      {
        'id': 18,
        'name': '二十四桥',
        'dynasty': '唐朝',
        'year': 820,
        'province': '江苏',
        'location': '江苏扬州',
        'type': '拱桥',
        'length': 40,
        'span': 8.0,
        'material': '石材'
      },
      {
        'id': 19,
        'name': '泸定桥',
        'dynasty': '清朝',
        'year': 1706,
        'province': '四川',
        'location': '四川甘孜',
        'type': '铁索桥',
        'length': 103,
        'span': 100.0,
        'material': '铁材'
      },
      {
        'id': 20,
        'name': '五里桥',
        'dynasty': '宋朝',
        'year': 1138,
        'province': '福建',
        'location': '福建晋江',
        'type': '石梁桥',
        'length': 2255,
        'span': 12.0,
        'material': '石材'
      },
      {
        'id': 21,
        'name': '通济桥',
        'dynasty': '明朝',
        'year': 1425,
        'province': '河北',
        'location': '河北正定',
        'type': '石拱桥',
        'length': 94,
        'span': 20.0,
        'material': '石材'
      },
      {
        'id': 22,
        'name': '清名桥',
        'dynasty': '明朝',
        'year': 1585,
        'province': '江苏',
        'location': '江苏无锡',
        'type': '石拱桥',
        'length': 43,
        'span': 13.0,
        'material': '石材'
      },
      {
        'id': 23,
        'name': '小商桥',
        'dynasty': '隋朝',
        'year': 584,
        'province': '河南',
        'location': '河南临颍',
        'type': '石拱桥',
        'length': 20.0,
        'span': 11.0,
        'material': '石材'
      },
      {
        'id': 24,
        'name': '广惠桥',
        'dynasty': '明朝',
        'year': 1460,
        'province': '广东',
        'location': '广东肇庆',
        'type': '梁桥',
        'length': 88,
        'span': 12.0,
        'material': '石材'
      },
      {
        'id': 25,
        'name': '广利桥',
        'dynasty': '清朝',
        'year': 1750,
        'province': '浙江',
        'location': '浙江湖州',
        'type': '石拱桥',
        'length': 68,
        'span': 16.0,
        'material': '石材'
      },
      {
        'id': 26,
        'name': '济川桥',
        'dynasty': '宋朝',
        'year': 1080,
        'province': '浙江',
        'location': '浙江绍兴',
        'type': '梁桥',
        'length': 80,
        'span': 14.0,
        'material': '石材'
      },
      {
        'id': 27,
        'name': '双桥',
        'dynasty': '明朝',
        'year': 1573,
        'province': '江苏',
        'location': '江苏周庄',
        'type': '石拱桥',
        'length': 35,
        'span': 9.0,
        'material': '石材'
      },
      {
        'id': 28,
        'name': '迎恩桥',
        'dynasty': '明朝',
        'year': 1446,
        'province': '浙江',
        'location': '浙江绍兴',
        'type': '石拱桥',
        'length': 52,
        'span': 13.0,
        'material': '石材'
      },
      {
        'id': 29,
        'name': '安济桥',
        'dynasty': '隋朝',
        'year': 605,
        'province': '河北',
        'location': '河北赵县',
        'type': '石拱桥',
        'length': 64.4,
        'span': 37.0,
        'material': '石材'
      },
      {
        'id': 30,
        'name': '朝宗桥',
        'dynasty': '明朝',
        'year': 1482,
        'province': '湖南',
        'location': '湖南长沙',
        'type': '石拱桥',
        'length': 73,
        'span': 17.0,
        'material': '石材'
      }
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