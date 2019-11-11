import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from './config/fbconfig';

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents);
firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
