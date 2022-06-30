import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  // base: path.resolve(__dirname, './dist/'),
  base: "./",
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src")
    }
  },
  plugins: [
    vue(),
  ]
})
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// const path = require('path');										// 新增

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: path.resolve(__dirname, './dist/'),	// 新增
//   plugins: [vue()]
// })