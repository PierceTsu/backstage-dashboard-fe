import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          name: '首页',
          component: resolve => require(['@/page/home/index'], resolve)
        },
        {
          path: 'inner_customer/overview',
          name: '国内客户概述',
          component: resolve => require(['@/page/home/inner_customer/overview'], resolve)
        },
        {
          path: 'outer_customer/overview',
          name: '国外客户概述',
          component: resolve => require(['@/page/home/outer_customer/overview'], resolve)
        }
      ]
    },
    {
      path: '/report',
      component: Home,
      redirect: '/report/index',
      children: [
        {
          path: 'index',
          name: '报表',
          component: resolve => require(['@/page/report/index'], resolve)
        },
        {
          path: 'system/overview',
          name: '系统概述',
          component: resolve => require(['@/page/report/system/overview'], resolve)
        },
        {
          path: 'system/service',
          name: '服务监控',
          component: resolve => require(['@/page/report/system/service'], resolve)
        },
        {
          path: 'business/overview',
          name: '业务概述',
          component: resolve => require(['@/page/report/business/overview'], resolve)
        },
        {
          path: 'business/stat',
          name: '客户统计',
          component: resolve => require(['@/page/report/business/stat'], resolve)
        }
      ]
    },
    {
      path: '/settings',
      component: Home,
      redirect: '/settings/index',
      children: [
        {
          path: 'index',
          name: '设置',
          component: resolve => require(['@/page/settings/index'], resolve)
        },
        {
          path: 'system/user_mgr',
          name: '用户管理',
          component: resolve => require(['@/page/settings/system/userMgr'], resolve)
        },
        {
          path: 'system/user_role_mgr',
          name: '角色管理',
          component: resolve => require(['@/page/settings/system/userRoleMgr'], resolve)
        },
        {
          path: 'system/menu_mgr',
          name: '菜单管理',
          component: resolve => require(['@/page/settings/system/menuMgr'], resolve)
        }
      ]
    }
  ]
})
