import request from '@/utils/request'

// 获取全部桥梁
export const getBridges = (params) => {
  return request.get('/bridges', { params })
}

// 按省查询
export const getBridgesByProvince = (province) => {
  return request.get('/bridges/by-province', {
    params: { province }
  })
}
// 按朝代
export const getBridgesByDynasty = (dynasty) => {
  return request.get('/bridges/by-dynasty', {
    params: { dynasty }
  })
}