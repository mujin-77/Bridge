import request from '../request'

// 获取全部桥梁/src/mock/bridges.json
export const getBridges = (params) => {
  return request.get('/api/bridges', { params })
}
// 按朝代/src/mock/by-dynasty.json
export const getBridgesByDynasty = () => {
  return request.get('/api/bridges/by-dynasty')
}
// 按省查询/src/mock/bridges.json
export const getBridgesByProvince = (province) => {
  return request.get('/api/bridges/by-province', {
    params: { province }
  })
}
// 按材料查询/src/mock/by-material.json
export const getMaterialStatistics = () => {
  return request.get('/api/bridges/by-material')
}

// 按施工工艺统计
export const getTechnologyStatistics = () => {
  return request.get('/api/bridges/by-technology')
}
