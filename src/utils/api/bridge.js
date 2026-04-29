import request from '@/utils/request'

// 获取全部桥梁/src/mock/bridges.json
export const getBridges = (params) => {
  return request.get('/bridges', { params })
}
// 按朝代/src/mock/by-dynasty.json
export const getBridgesByDynasty = () => {
  return request.get('/bridges/by-dynasty')
}
// 按省查询/src/mock/bridges.json
export const getBridgesByProvince = (province) => {
  return request.get('/bridges/by-province', {
    params: { province }
  })
}
// 按材料查询/src/mock/by-material.json
export const getMaterialStatistics = () => {
  return request.get('/bridges/by-material')
}
