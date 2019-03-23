<template>
  <div class="green">{{msg}}</div>
</template>

<script>
export default {
  name: 'foo',
  data() {
    return {
      msg: 'Hello, vue'
    }
  }
}
</script>

<style lang="scss">
$color: red;

.green {
  color: $color;
}
</style>
