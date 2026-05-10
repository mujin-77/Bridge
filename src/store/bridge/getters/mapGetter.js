// mapGetter.js - 地图相关 getter

const provinceFullNameMap = {
  '北京': '北京市', '天津': '天津市', '河北': '河北省', '山西': '山西省',
  '内蒙古': '内蒙古自治区', '辽宁': '辽宁省', '吉林': '吉林省', '黑龙江': '黑龙江省',
  '上海': '上海市', '江苏': '江苏省', '浙江': '浙江省', '安徽': '安徽省',
  '福建': '福建省', '江西': '江西省', '山东': '山东省', '河南': '河南省',
  '湖北': '湖北省', '湖南': '湖南省', '广东': '广东省', '广西': '广西壮族自治区',
  '海南': '海南省', '重庆': '重庆市', '四川': '四川省', '贵州': '贵州省',
  '云南': '云南省', '西藏': '西藏自治区', '陕西': '陕西省', '甘肃': '甘肃省',
  '青海': '青海省', '宁夏': '宁夏回族自治区', '新疆': '新疆维吾尔自治区'
}

// 简称转全称
const toFullName = (short) => provinceFullNameMap[short] || short

// 全称转简称
const toShortName = (full) => {
  for (const [short, f] of Object.entries(provinceFullNameMap)) {
    if (f === full) return short
  }
  return full
}

export default {
  // ✅ 全国地图统计数据（返回数组格式）
  getChinaData(state) {
    const count = {}
    state.rawData.forEach(item => {
      if (!item.province) return
      const fullName = toFullName(item.province)
      count[fullName] = (count[fullName] || 0) + 1
    })
    return Object.entries(count).map(([name, value]) => ({ name, value }))
  },

  // ✅ 省份下钻数据（返回数组格式）
  getProvinceData(state) {
    return (provinceFullName) => {
      const shortName = toShortName(provinceFullName)
      const count = {}
      
      state.rawData.forEach(item => {
        // 匹配省份（简称或全称都行）
        if (item.province !== shortName && item.province !== provinceFullName) return
        
        // 提取城市名："河北赵县" -> "赵县"
        let city = item.location
        if (city.startsWith(shortName)) {
          city = city.slice(shortName.length)
        }
        if (!city) city = item.location
        
        count[city] = (count[city] || 0) + 1
      })
      
      return Object.entries(count).map(([name, value]) => ({ name, value }))
    }
  },

  // ✅ 获取省份编码
  getProvinceCode(state) {
    return (name) => state.provinceCodeMap[name]
  }
}
