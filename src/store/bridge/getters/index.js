// getters/index.js - 合并所有 getter

import chartGetter from './chartGetter'
import mapGetter from './mapGetter'
import materialGetter from './materialGetter'
import techGetter from './techGetter'
import filterGetter from './filterGetter'

export default {
  ...chartGetter,
  ...mapGetter,
  ...materialGetter,
  ...techGetter,
  ...filterGetter
}
