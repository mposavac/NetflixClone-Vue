import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Browse from '../views/Browse.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  if (store.getters.isAuth) {
    if (to.params.profileId || from.name === 'home' || to.name === 'profile')
      next();
    else next({ name: 'profile' });
    return;
  }
  next('/');
};
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuth) next({ name: 'profile' });
      else next();
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    props: true,
    beforeEnter: isAuthenticated
  },
  {
    path: '/browse',
    name: 'browse',
    component: Browse,
    props: true,
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
