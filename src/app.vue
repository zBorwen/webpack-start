<template lang='pug'>
#app(:class='$style.red') {{msg}}
  <e-header></e-header>
</template>

<script>
import EHeader from './components/header.vue'
export default {
  data() {
    return {
      msg: 'hello webpack4'
    }
  },
  components: {
    EHeader
  }
}
</script>

<style module>
/* 666 */
.red {
  color: red;
}
</style>
