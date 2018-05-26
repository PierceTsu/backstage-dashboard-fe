<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <template v-if="sideMenu.length > 0">
      <template v-for="(item, index) in sideMenu">
        <el-menu-item v-if="item.children.length === 0" :key="item.label" :index="filterPath(item.href, index)">
          <i>{{item.icon}}</i>
          <span>{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.label" :index="filterPath(item.name, index)">
          <template slot="title">
            <i>{{item.icon}}</i>
            <span>{{item.label}}</span>
          </template>
          <template v-for="(child, cindex) in item.children">
            <el-menu-item :index="filterPath(child.href, cindex)" :key="cindex" @click="open(child)" v-if="child.children.length === 0">
              <i>{{child.icon}}</i>
              <span slot="title">{{child.label}}</span>
            </el-menu-item>
            <side-menu v-else :sideMenu="[child]" :key="cindex" ></side-menu>
          </template>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    filterPath (path, index) {
      return path == null ? index + '' : path
    },
    open (item) {
      this.$router.push({
        path: item.href
      })
    }
  },
  props: {
    sideMenu: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
