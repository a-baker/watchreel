import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  const VueGtag = require('vue-gtag');

  Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_GA_ID },
  }, router);
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
