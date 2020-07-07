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
import Practice from '@/pages/practice'
import Recite from '@/pages/recite'
import IssueAddPage from '@/pages/issue/add'
import StatsIndex from '@/pages/stats'
import ArticlesIndex from '@/pages/articles'
import Upload from '@/pages/upload'
import Board from '@/pages/board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'add.vue',
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
    },
    {
      path: '/recite',
      name: 'recite',
      component: Recite
    },
    {
      path: '/issueAddPage',
      name: 'issueAddPage',
      component: IssueAddPage
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsIndex
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesIndex
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice
    },
    {
      path: '/board',
      name: 'board',
      component: Board
    }
  ]
})
