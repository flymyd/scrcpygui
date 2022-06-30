import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
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
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'components.d.ts'
    }),
  ],
})
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// const path = require('path');										// 新增

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: path.resolve(__dirname, './dist/'),	// 新增
//   plugins: [vue()]
// })