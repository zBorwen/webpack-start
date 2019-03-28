import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/page2/',
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  }]
})
