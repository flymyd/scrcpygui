import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import("@/views/Index.vue"),
    meta: {
      title: 'Scrcpy GUI'
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
