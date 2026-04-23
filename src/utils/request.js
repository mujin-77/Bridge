import axios from 'axios'

// 1. 创建实例
const service = axios.create({
  baseURL: '/api', // 后端地址（开发时可用代理）
  timeout: 5000
})

// 2. 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
  }
)

// 3. 响应拦截器
service.interceptors.response.use(
  response => {
    // 只返回数据部分
    return response.data
  },
  error => {
    console.log('请求错误', error)
    return Promise.reject(error)
  }
)

export default service