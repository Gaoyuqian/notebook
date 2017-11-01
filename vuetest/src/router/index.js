import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import firstPage from '@/components/index'
import first from '@/components/notefirst'
import yestoday from '@/components/yestoday'
import today from '@/components/today'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:firstPage,
    },
    {
      path: '/index',
      name: 'first',
      component: first,
      children:[{
        path:'yestoday',
        component: yestoday,
      },{
        path:'today',
        component: today,
      }]
    }
  ]
})
