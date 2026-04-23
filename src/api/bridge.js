import request from '@/utils/request'

// 获取桥梁数据
export const getBridgeList = (type) => {
  return request({
    url: '/bridge',
    method: 'get',
    params: { type }
  })
}

// 删除
export const deleteBridge = (id) => {
  return request({
    url: `/bridge/${id}`,
    method: 'delete'
  })
}

// 编辑
export const updateBridge = (data) => {
  return request({
    url: '/bridge',
    method: 'put',
    data
  })
}