import Vue from 'vue'
import Router from 'vue-router'
import firstPage from '@/components/index'
import first from '@/components/notefirst'
import yestoday from '@/components/yestoday'
import today from '@/components/today'
import tongji from '@/components/tongji'
import zhuce from '@/components/zhuce'
import login from '@/components/login'
import tongjitotal from '@/components/tongjiTotal'



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
      },{
        path:'tongji',
        component: tongji,
      },
      {
        path:'tongjitotal',
        component: tongjitotal,
      }
    ]
    },
    {
      path:'/zhuce',
      component:zhuce
    },{
      path:'/login',
      component:login
    }
  ]
})
