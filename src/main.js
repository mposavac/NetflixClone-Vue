import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from './config/fbconfig';

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
