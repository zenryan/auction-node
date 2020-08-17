import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';

// TODO: no production ready
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  mode: 'cors',
});

Vue.config.productionTip = false;
Vue.prototype.$http = axiosInstance;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
