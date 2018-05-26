<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect">
    <template v-for="(item, index) in topMenu">
      <el-menu-item v-if="item.children.length === 0" :key="item.label" :index="filterPath(item.href,index)">
        <i>{{item.icon}}</i>
        <span>{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-else :key="item.label" :index="filterPath(item.name, index)">
        <template slot="title">
          <i>{{item.icon}}</i>
          <span>{{item.label}}</span>
        </template>
        <template v-for="(child, cindex) in item.children">
          <el-menu-item :index="filterPath(child.href, cindex)" :key="cindex">
            <i>{{child.icon}}</i>
            <span slot="title">{{child.label}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'TopMenu',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    filterPath (path, index) {
      return path == null ? index + '' : path
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  props: {
    topMenu: {
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
