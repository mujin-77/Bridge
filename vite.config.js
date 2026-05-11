import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // 只保留 Vite 支持的配置
  plugins: [
    vue()
  ],

  // 配置 @ 指向 src
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // Less 全局变量自动引入
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/css/index.less";'
      }
    }
  },

  // 本地开发跨域（部署后不影响）
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/bridges': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})