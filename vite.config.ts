import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import PurgeIcons from 'vite-plugin-purge-icons'
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
    VueSetupExtend(),
    vueJsx(),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'components.d.ts'
    }),
    AutoImport({
      // dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: ['vue']
    }),
    PurgeIcons({ content: ['**/*.html', '**/*.ts', '**/*.js', '**/*.vue'] })
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