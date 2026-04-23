import { createApp } from 'vue'
import App from './App.vue'
import '@/css/index.less' 

import router from './router'
//import store from '@/store'
//import axios from './axios'

import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)

//app.use(store)
//app.use(axios)

app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')