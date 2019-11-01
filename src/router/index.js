import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Login from '@/pages/login'
import Main from '@/pages/main'
import Ticket from '@/pages/ticket'
import Book from '@/pages/books'
import MemoryDate from '@/pages/memoryDate'
import Note from '@/pages/note'
import Habits from '@/pages/habits'

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
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: Ticket
    },
    {
      path: '/book',
      name: 'book',
      component: Book
    },
    {
      path: '/memoryDate',
      name: 'memoryDate',
      component: MemoryDate
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/habits',
      name: 'habits',
      component: Habits
    }
  ]
})
