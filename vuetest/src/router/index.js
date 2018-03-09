import Vue from 'vue'
import Router from 'vue-router'

import test from '@/Venus/test'
import test1 from '@/Venus/test1'





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
    {
      path:'/test1',
      component:test1,
    },
  ]
})
