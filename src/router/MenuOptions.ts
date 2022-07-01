import { MenuOption } from "naive-ui";

export const MenuList: MenuOption[] = [
  {
    label: '首页',
    key: 'Home',
    route: true,
    name: 'Home',
  },
  {
    type: 'group',
    label: '设置',
    key: 'Settings',
    children: [ 
      {
        route: true,
        name: 'Streaming',
        label: '串流设置',
        // disabled: true
      },
      {
        route: true,
        name: 'Capture',
        label: '录制和采集设置'
      },
      {
        label: '饮品', 
        key: 'beverage',
        children: [
          {
            label: '威士忌',
            key: 'whisky',
            href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
          }
        ]
      },
    ]
  },
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing4',
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  }
]