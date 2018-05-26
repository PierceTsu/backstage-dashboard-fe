<template>
  <div>
    <div class="logo">YaoYueHome</div>
    <side-menu :sideMenu="sideMenu"/>
  </div>
</template>

<script>
import SideMenu from './SideMenu'
export default {
  name: 'index',
  components: {SideMenu},
  data () {
    return {
      sideMenu: [
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
              parent_id: 11,
              label: '概述',
              icon: '',
              href: '/home/outer_customer/overview',
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
.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
</style>
