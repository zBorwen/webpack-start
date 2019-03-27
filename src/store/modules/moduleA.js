const moduleA = {
  state: {
    msg: 'hello vue'
  },
  mutations: {
    edit(state, txt) {
      state.txt += txt
    }
  },
  actions: {
    setMsg({
      commit
    }) {
      commit('edit', 'world')
    }
  },
  getters: {
    getMsg(state) {
      return state.msg + '!'
    }
  }
}

export default moduleA
