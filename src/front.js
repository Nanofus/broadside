import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './components/App.vue'
import Post from './components/Post.vue'
import Write from './components/Write.vue'
import List from './components/List.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Custom from './components/Custom.vue'
import NotFound from './components/NotFound.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: List },
    { path: '/post/:id', component: Post },
    { path: '/write/:id', component: Write },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/:name', component: Custom },
    { path: '*', component: NotFound }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
