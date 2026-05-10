// bridge/index.js - 组合 store

import { defineStore } from 'pinia'
import state from './state'
import getters from './getters'
import actions from './actions'

export const useBridgeStore = defineStore('bridge', {
  state,
  getters,
  actions
})

// 导出子 getter 方便按需引入
export * from './getters'
