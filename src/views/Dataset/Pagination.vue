<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['change'])

const jumpPage = ref('')

const pages = computed(() => {
  const arr = []
  for (let i = 1; i <= props.totalPages; i++) {
    arr.push(i)
  }
  return arr
})

const goPage = (p) => {
  if (p < 1 || p > props.totalPages) return
  emit('change', p)
}

const jump = () => {
  const p = Number(jumpPage.value)
  if (!p) return
  goPage(p)
  jumpPage.value = ''
}
</script>

<template>
  <div class="pagination">
    <button
      :disabled="page <= 1"
      @click="goPage(page - 1)"
    >
      上一页
    </button>

    <span>第 {{ page }} / {{ totalPages }} 页</span>

    <button
      :disabled="page >= totalPages"
      @click="goPage(page + 1)"
    >
      下一页
    </button>

    <select @change="e => goPage(Number(e.target.value))">
      <option
        v-for="p in pages"
        :key="p"
        :value="p"
      >
        第 {{ p }} 页
      </option>
    </select>

    <input
      v-model="jumpPage"
      placeholder="跳页"
      style="width:60px"
    >
    <button @click="jump">
      跳转
    </button>

    <span>共 {{ total }} 条</span>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: 10px;
}
button:disabled {
  opacity: 0.5;
}
</style>