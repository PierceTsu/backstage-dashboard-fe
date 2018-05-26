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
          component: resolve => require(['@/page/report/index.vue'], resolve)
        }
      ]
    }
  ]
})
