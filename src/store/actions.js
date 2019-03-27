export default {
  setCount({
    commit
  }, item) {
    commit('addCount', item)
  }
}
