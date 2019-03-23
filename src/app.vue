<template>
  <div id="app">
    <Hello></Hello>
    <Foo></Foo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Foo from './components/Foo'
export default {
  name: 'app',
  components: {
    Hello,
    Foo
  }
}
</script>
