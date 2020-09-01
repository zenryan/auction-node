import Vue from 'vue';
import axios from 'axios';
import { Datetime } from 'vue-datetime';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

import App from './App.vue';
import router from './router';
import './assets/styles/index.css';

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 1000,
  mode: 'cors',
});

Vue.use(Datetime);
Vue.config.productionTip = false;
Vue.prototype.$http = axiosInstance;

/** vue-socket.io */
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(process.env.VUE_APP_API_HOST),
  })
);

/* eslint arrow-parens: "off" */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
