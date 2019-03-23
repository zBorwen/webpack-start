<template>
  <div id="app" :class="$style.red">
    <hello>{{msg}}</hello>
  </div>
</template>

<script>
import hello from './components/hello'
export default {
  data() {
    return {
      msg: 'hello1'
    }
  },
  components: {
    hello
  }
}
</script>

<style module>
.red {
  color: red;
}
</style>
