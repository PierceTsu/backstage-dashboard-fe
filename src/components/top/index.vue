<template>
  <top-menu :topMenu="topMenu"/>
</template>

<script>
import TopMenu from './TopMenu'
import {mapGetters} from 'vuex'
export default {
  name: 'index',
  components: {TopMenu},
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('GetTopMenu').then(data => {})
  },
  computed: {
    ...mapGetters(['topMenu'])
  }
}
</script>

<style scoped>

</style>
