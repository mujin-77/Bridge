import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as echarts from 'echarts'
import VChart from 'vue-echarts'

import '@/css/index.less'

const app = createApp(App)

// 关键：挂载 echarts 到全局
app.config.globalProperties.$echarts = echarts

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

// 注册组件
app.component('VChart', VChart)

app.mount('#app')