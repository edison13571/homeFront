import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Main from '@/pages/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})
