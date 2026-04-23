<template>
  <el-carousel
    :interval="4000"
    type="card"
    height="70vh"
    :card-scale="0.6"
  >
    <el-carousel-item
      v-for="item in banners"
      :key="item.img"
    >
      <div class="image-wrapper">
        <img
          :src="item.img"
          alt=""
        >
      </div>
      <div class="title">
        {{ item.title }}
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { ref } from 'vue'

const banners = ref([
  { img: new URL('@/assets/bridge/1 (21).png', import.meta.url).href, title: '北盘江第一桥' },
  { img: new URL('@/assets/bridge/2 (1).png', import.meta.url).href, title: '鸭池河大桥' },
  { img: new URL('@/assets/bridge/2 (3).png', import.meta.url).href, title: '平塘特大桥' },
  { img: new URL('@/assets/bridge/1 (14).png', import.meta.url).href, title: '鸭池河大桥' },
  { img: new URL('@/assets/bridge/2 (2).png', import.meta.url).href, title: '坝陵河大桥' },
])
</script>

<style lang="less" scoped>
:deep(.el-carousel__container) {
  overflow: visible !important;
}
:deep(.el-carousel__item) {
  overflow: visible !important;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.4s ease;
}

:deep(.el-carousel__item.is-active .image-wrapper) {
  transform: scaleX(1.6);   /* 调节水平拉伸程度 */
  z-index: 5;
  box-shadow:
    0 0 20px rgba(248, 113, 113, 0.6),
    0 0 40px rgba(56, 189, 248, 0.3);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #020617;
}

.title {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 6px 24px;
  border-radius: 40px;
  font-size: 18px;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  z-index: 10;
}
</style>