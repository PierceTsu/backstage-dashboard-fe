<template>
  <el-container id="container">
    <el-aside><sidebar/></el-aside>
    <el-container>
      <el-header><top/></el-header>
      <el-main>
        Main
      </el-main>
      <el-footer><bottom/></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import top from './top/index'
import bottom from './footer/index'
import sidebar from './sidebar/index'
export default {
  name: 'Home',
  components: {top, bottom, sidebar},
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
