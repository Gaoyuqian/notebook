import Vue from 'vue'
import Router from 'vue-router'

import test from '@/Venus/test'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:test,
    },
    {
      path:'/test',
      component:test,
    },
  ]
})
