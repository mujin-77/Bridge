import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/', redirect: '/HomePage' },
  { path: '/HomePage', component: () => import('../views/HomePage.vue') },
  { path: '/DataScreen', component: () => import('../views/DataScreen.vue') },
  { path: '/Dataset', component: () => import('../views/Dataset.vue') },
  { path: '/login', component: () => import('../views/Dataset/LoginPage.vue') },
  
  { path: '/comparative_anlysis', component: () => import('../views/DataScreen/comparative_anlysis.vue') },
  { path: '/Development', component: () => import('../views/DataScreen/BridgeDevelopment.vue') },
  { path: '/BridgeTypes', component: () => import('../views/DataScreen/BridgeTypes.vue') },
  { path: '/BridgeTechnology', component: () => import('../views/DataScreen/BridgeTechnology.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router