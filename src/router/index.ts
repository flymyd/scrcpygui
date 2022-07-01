import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import("@/views/Index.vue"),
    redirect: 'Home',
    meta: {
      title: 'Scrcpy GUI'
    },
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import("@/views/Home.vue"),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'Settings/Streaming',
        name: 'Streaming',
        component: () => import("@/views/Settings/Streaming.vue"),
        meta: {
          title: '串流设置'
        }
      },
      {
        path: 'Settings/Capture',
        name: 'Capture',
        component: () => import("@/views/Settings/Capture.vue"),
        meta: {
          title: '录制和采集设置'
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
