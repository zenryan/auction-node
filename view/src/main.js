import Vue from 'vue';
import axios from 'axios';
import { Datetime } from 'vue-datetime';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

import App from './App.vue';
import router from './router';
// You need a specific loader for CSS files

// TODO: no production ready
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
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
    connection: SocketIO('http://localhost:3000'),
  })
);

/* eslint arrow-parens: "off" */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
