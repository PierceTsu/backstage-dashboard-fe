<template>
  <div>
    <div class="logo">YaoYueHome</div>
    <side-menu :sideMenu="sideMenu"/>
  </div>
</template>

<script>
import SideMenu from './SideMenu'
import {mapGetters} from 'vuex'
export default {
  name: 'index',
  components: {SideMenu},
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('GetSideMenu', 0).then(data => {})
  },
  computed: {
    ...mapGetters(['sideMenu'])
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
