<template>
  <div>
    <div v-if='loader.show'>
      <transition>
        <div class='loader-wrapper'></div>
      </transition>
    </div>
    <div v-else></div>
  </div>
</template>
<script type='text/babel'>
// Vuex
import { mapState } from 'vuex'
export default {
  name: 'loader',
  computed: mapState(['loader'])
}
</script>
<style lang='scss' scoped>
.loader-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow: visible;
  background: #333 url('http://files.mimoymima.com/images/loading.gif')
    no-repeat center center;
}
</style>
