export const topMenu = [
  {
    id: 0,
    label: '首页',
    icon: '',
    href: '/home',
    children: []
  },
  {
    id: 1,
    label: '报表',
    icon: '',
    href: '/report',
    children: []
  },
  {
    id: 2,
    label: '设置',
    icon: '',
    href: '/settings',
    children: [
    ]
  }
]

export const sideMenu = [
  [
    {
      id: 11,
      parent_id: 0,
      label: '国内客户',
      icon: '',
      href: '/home/inner_customer',
      children: [
        {
          id: 111,
          parent_id: 11,
          label: '概述',
          icon: '',
          href: '/home/inner_customer/overview',
          children: []
        }
      ]
    },
    {
      id: 12,
      parent_id: 0,
      label: '国外客户',
      icon: '',
      href: '/home/outer_customer',
      children: [
        {
          id: 111,
          parent_id: 12,
          label: '概述',
          icon: '',
          href: '/home/outer_customer/overview',
          children: []
        }
      ]
    }
  ],
  [
    {
      id: 21,
      parent_id: 1,
      label: '系统报表',
      icon: '',
      href: '/report/system',
      children: [
        {
          id: 211,
          parent_id: 11,
          label: '概述',
          icon: '',
          href: '/report/system/overview',
          children: []
        },
        {
          id: 212,
          parent_id: 11,
          label: '服务监控',
          icon: '',
          href: '/report/system/service',
          children: []
        }
      ]
    },
    {
      id: 21,
      parent_id: 1,
      label: '业务报表',
      icon: '',
      href: '/report/business',
      children: [
        {
          id: 211,
          parent_id: 21,
          label: '概述',
          icon: '',
          href: '/report/business/overview',
          children: []
        },
        {
          id: 212,
          parent_id: 21,
          label: '客户统计',
          icon: '',
          href: '/report/business/stat',
          children: []
        }
      ]
    }
  ],
  [
    {
      id: 31,
      parent_id: 2,
      label: '系统管理',
      icon: '',
      href: '/settings/system',
      children: [
        {
          id: 311,
          parent_id: 31,
          label: '用户管理',
          icon: '',
          href: '/settings/system/user_mgr',
          children: []
        },
        {
          id: 312,
          parent_id: 31,
          label: '角色管理',
          icon: '',
          href: '/settings/system/user_role_mgr',
          children: []
        },
        {
          id: 313,
          parent_id: 31,
          label: '菜单管理',
          icon: '',
          href: '/settings/system/menu_mgr',
          children: []
        }
      ]
    }
  ]
]
// export const menu = [topMenu, sideMenu]
