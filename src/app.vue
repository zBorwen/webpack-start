<template>
  <div id="app" :class="$style.red">{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello1'
    }
  }
}
</script>

<style module>
.red {
  color: red;
}
</style>
