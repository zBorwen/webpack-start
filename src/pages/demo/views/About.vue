<template>
  <div class="about">
    <h1>{{getMsg}}</h1>
    <h2>{{getCount}}</h2>
    <button @click="addCount">添加</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      num: 4
    }
  },
  computed: {
    ...mapGetters(['getMsg', 'getCount'])
  },
  methods: {
    addCount() {
      this.setCount(this.num++)
    },
    ...mapActions(['setMsg', 'setCount'])
  }
}
</script>
