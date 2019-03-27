import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import {
  ROOT_MUTATIONS
} from './mutations'
import moduleA from './modules/moduleA'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: [1, 2, 3]
  },
  modules: {
    moduleA
  },
  mutations: ROOT_MUTATIONS,
  actions,
  getters: {
    getCount(state) {
      return state.count.join('-')
    }
  }
})
