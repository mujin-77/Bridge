import axios from 'axios'

const baseURL = import.meta.env.DEV
'http://localhost:3000'

const request = axios.create({
  baseURL,
  timeout: 5000
})

export default request