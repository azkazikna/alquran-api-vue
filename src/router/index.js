import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuranView from '../views/QuranView.vue'
import SurahView from '../views/SurahView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/quran',
    name: 'quran',
    component: QuranView
  },
  {
    path: '/surah/:id',
    name: 'surah',
    component: SurahView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
