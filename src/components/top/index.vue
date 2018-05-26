<template>
  <top-menu :topMenu="topMenu"/>
</template>

<script>
import TopMenu from './TopMenu'
export default {
  name: 'index',
  components: {TopMenu},
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      topMenu: [
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
            {
              id: 20,
              label: '设置一',
              icon: '',
              href: '/settings/nav1',
              children: []
            },
            {
              id: 21,
              label: '设置二',
              icon: '',
              href: '/settings/nav2',
              children: []
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
