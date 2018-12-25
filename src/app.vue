<template lang='pug'>
#app(:class='$style.red') {{msg}}
  <e-header></e-header>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello webpack4'
    }
  }
}
</script>

<style module>
/* 666 */
.red {
  color: red;
}
</style>
