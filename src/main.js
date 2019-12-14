import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import moviePage from './components/pages/movie_page.vue'
import PageMovie from './components/pages/main_page.vue'
import searchPage from './components/pages/search_page.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: PageMovie, props: true},
    { path: '/movie/:id', component: moviePage, props: true },
    { name: 'search', path: '/search', component: searchPage, props: true }
  ]
})

new Vue({
  el: '#app',
    router: router,
  render: h => h(App)
})
