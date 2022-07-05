import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App)
  .use(router)
  .use(pinia)
  .directive('nomove', {
    mounted(el: any) {
      let agent = window.navigator.userAgent.toLowerCase(), start, move: any, end: any
      if (["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"].some(i => agent.includes(i))) {
        start = 'touchstart'; move = 'touchmove'; end = 'touchend'
      } else {
        start = 'mousedown'; move = 'mousemove'; end = 'mouseup'
      }
      el.addEventListener(start, (e: any) => {
        e.preventDefault();
      })
    }
  })
  .mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as any
  }
  next()
})