import axios from 'axios'

const baseURL = 'http://localhost:3000'

const request = axios.create({
  baseURL,
  timeout: 5000
})

export default request