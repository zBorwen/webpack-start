import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL + 'page1',
  routes: [{
    path: '/',
    name: 'p1',
    component: () => import('../views/Home.vue')
  }]
})
