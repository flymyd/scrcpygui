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
          title: 'Scrcpy GUI'
        }
      },
      {
        path: 'About',
        name: 'About',
        component: () => import("@/views/About.vue"),
        meta: {
          title: '关于'
        }
      },
      {
        path: 'MySettings',
        name: 'MySettings',
        component: () => import("@/views/MySettings.vue"),
        meta: {
          title: '软件设置'
        }
      },
      {
        path: 'Settings/Mirror',
        name: 'Mirror',
        component: () => import("@/views/Settings/Mirror.vue"),
        meta: {
          title: '镜像'
        }
      },
      {
        path: 'Settings/Capture',
        name: 'Capture',
        component: () => import("@/views/Settings/Capture.vue"),
        meta: {
          title: '录制和采集'
        }
      },
      // {
      //   path: 'Settings/Connection',
      //   name: 'Connection',
      //   component: () => import("@/views/Settings/Connection.vue"),
      //   meta: {
      //     title: '连接性'
      //   }
      // },
      {
        path: 'Settings/Window',
        name: 'Window',
        component: () => import("@/views/Settings/Window.vue"),
        meta: {
          title: '窗口'
        }
      },
      {
        path: 'Settings/InputControl',
        name: 'InputControl',
        component: () => import("@/views/Settings/InputControl.vue"),
        meta: {
          title: '输入'
        }
      },
      {
        path: 'Settings/Others',
        name: 'Others',
        component: () => import("@/views/Settings/Others.vue"),
        meta: {
          title: '其它'
        }
      },
    ]
  },
  {
    path: '/Configs',
    name: 'Configs',
    component: () => import("@/views/Configs.vue"),
    meta: {
      title: '配置管理'
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
