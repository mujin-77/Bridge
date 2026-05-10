import axios from 'axios'

// 根据环境自动设置 baseURL
// 开发环境: http://localhost:3000
// 生产环境: 空字符串（使用相对路径）
const isDev = import.meta.env.DEV
const baseURL = isDev ? 'http://localhost:3000' : ''

const request = axios.create({
  baseURL,
  timeout: 5000
})


export default request