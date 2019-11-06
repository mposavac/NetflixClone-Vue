import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Browse from '../views/Browse.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuth) {
    next();
    return;
  }
  next('/');
};
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
    beforeEnter: isAuthenticated
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
