<template lang='pug'>
  #app(:class='$style.red') {{msg}}
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'hello webpack4'
    }
  }
}
</script>

<style module>
.red {
  color: red;
}
</style>
