import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Movie from '@/pages/Movie'
import Favorites from '@/pages/Favorites'
import Genre from '@/pages/Genre'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: {auth: true}
    },
    {
      path: '/genre/:id',
      name: 'Genre',
      component: Genre
    }
  ]
})
