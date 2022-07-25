import { MenuOption } from "naive-ui";

export const MenuList: MenuOption[] = [
  {
    label: 'Scrcpy GUI',
    key: 'Home',
    route: true,
    name: 'Home',
  },
  {
    type: 'group',
    label: '设置',
    key: 'Settings',
    children: [
      // {
      //   route: true,
      //   name: 'Connection',
      //   label: '连接性'
      // },
      {
        route: true,
        name: 'Mirror',
        label: '镜像',
        // disabled: true
      },
      {
        route: true,
        name: 'Capture',
        label: '录制和采集'
      },
      {
        route: true,
        name: 'Window',
        label: '窗口'
      },
      {
        route: true,
        name: 'InputControl',
        label: '输入'
      },
      {
        route: true,
        name: 'Others',
        label: '其它'
      },
      // {
      //   label: '二级菜单', 
      //   key: 'beverage',
      //   children: [
      //     {
      //       label: '威士忌',
      //       key: 'whisky',
      //       href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
      //     }
      //   ]
      // },
    ]
  },
  // {
  //   label: '关于1',
  //   key: 'About1',
  //   href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  // },
  {
    route: true,
    name: 'About',
    label: '关于'
  },
  {
    route: true,
    name: 'MySettings',
    label: '软件设置'
  },
]