import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import NProgress from 'nprogress'
import {getToken} from '../utils/auth'

Vue.use(Router)

export function generateIndexRouter () {
  let indexRouter = []
  if (localStorage.routers) {
    let routers = JSON.parse(localStorage.routers)
    for (let router of routers) {
      let pRouterProps = JSON.parse(router.properties)
      pRouterProps['meta']['routerId'] = router.id
      let parentRouter = {
        path: '/' + router.code,
        name: router.name,
        component: Layout,
        children: [],
        meta: pRouterProps.meta
      }
      // 子路由
      for (let cRouter of router.children) {
        let routerProps = JSON.parse(cRouter.properties)
        routerProps['meta']['routerId'] = cRouter.id
        let childrenRouter = {
          path: cRouter.code,
          name: cRouter.name,
          component: resolve => require(['@/page/' + router.code + '/' + cRouter.code], resolve),
          meta: routerProps.meta
        }
        parentRouter.children.push(childrenRouter)
      }

      indexRouter.push(parentRouter)
    }
  }
  return indexRouter
}

export const constantRouterMap = [
  {
    path: '/login',
    component: resolve => require(['@/page/login/index'], resolve),
    meta: {requiresAuth: false}
  },
  {
    path: '/404',
    component: resolve => require(['@/page/error/404'], resolve),
    meta: {requiresAuth: false}
  },
  {
    path: '/',
    name: '首页',
    component: Layout,
    redirect: '/home',
    meta: {requiresAuth: true},
    children: [
      {
        path: 'home',
        component: resolve => require(['@/page/home/index'], resolve),
        meta: {requiresAuth: true}
      }
    ]
  }
]

const router = new Router({
  mode: 'hash',
  routes: constantRouterMap
})
router.addRoutes(generateIndexRouter())

router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = getToken()
  if (to.meta.requiresAuth) { // 权限登录校验
    if (token) { // 登录
      next()
    } else { // 未登录
      next('/login')
      NProgress.done()
    }
  } else { // 不需要权限
    if (to.path === '/login') {
      if (token) { // 已登录, 需要再登录
        next('/home')
        NProgress.done()
      } else {
        next()
      }
    } else {
      next()
    }
  }
})
//
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router
