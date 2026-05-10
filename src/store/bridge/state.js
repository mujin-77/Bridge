// state.js - 只放数据

export default () => ({
  // 👉 核心数据结构（示例数据，后期对接后端接口）
  rawData: [
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
  },

  // 👉 朝代映射
  dynastyMap: {
    xia: { name: '夏', start: -2070, end: -1600 },
    shang: { name: '商', start: -1600, end: -1046 },
    zhou: { name: '周', start: -1046, end: -256 },
    qin: { name: '秦', start: -221, end: -206 },
    han: { name: '汉', start: -202, end: 220 },
    sui: { name: '隋', start: 581, end: 618 },
    tang: { name: '唐', start: 618, end: 907 },
    song: { name: '宋', start: 960, end: 1279 },
    yuan: { name: '元', start: 1271, end: 1368 },
    ming: { name: '明', start: 1368, end: 1644 },
    qing: { name: '清', start: 1644, end: 1912 }
  },

  // 👉 朝代分布数据（来自原 bridge.js dataset）
  dataset: [
    ['桥梁类型', '夏', '商', '周', '秦', '汉', '隋', '唐', '宋', '元', '明', '清'],
    ['梁式桥', 10, 15, 20, 30, 50, 80, 120, 160, 180, 200, 220],
    ['拱式桥', 5, 8, 15, 20, 40, 90, 150, 200, 220, 250, 300],
    ['悬索桥', 0, 0, 2, 5, 10, 20, 40, 60, 80, 120, 150],
    ['斜拉桥', 0, 0, 0, 0, 5, 10, 20, 40, 60, 100, 130],
    ['刚架桥', 0, 2, 5, 10, 20, 30, 50, 70, 90, 120, 140],
    ['浮桥', 20, 25, 30, 40, 50, 60, 70, 80, 70, 60, 50]
  ],

  // 👉 材料数据（来自原 material.js）
  materialData: {
    xData: ['钢筋混凝土', '预应力混凝土', '钢材', '石料', '混凝土', '木材', '其他'],
    seriesData: [
      { name: '梁式桥', data: [220, 180, 150, 300, 260, 120, 80] },
      { name: '拱式桥', data: [100, 120, 90, 400, 300, 150, 60] },
      { name: '悬索桥', data: [80, 150, 200, 20, 60, 10, 30] },
      { name: '斜拉桥', data: [120, 200, 250, 10, 80, 5, 20] },
      { name: '刚架桥', data: [90, 110, 130, 50, 100, 40, 30] },
      { name: '浮桥', data: [30, 20, 40, 200, 150, 300, 100] }
    ]
  },

  // 👉 技术数据（来自原 technology.js）
  techData: {
    rawData: [
      [120, 100, 80, 60, 90, 140],
      [200, 180, 150, 120, 160, 100],
      [80, 60, 50, 40, 70, 30],
      [150, 200, 220, 180, 170, 90],
      [180, 160, 140, 120, 150, 200]
    ],
    xData: ['梁式桥', '拱式桥', '悬索桥', '斜拉桥', '刚架桥', '浮桥'],
    techNames: ['明挖扩大基础', '桩基础', '沉井基础', '悬臂施工法', '预制装配法']
  },

  // 👉 筛选状态
  filters: {
    type: '',
    province: '',
    dynasty: '',
    material: ''
  }
})
