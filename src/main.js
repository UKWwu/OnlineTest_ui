import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import coo from '../src/page/cookie'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

var echarts = require('echarts');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  coo,
  echarts,
  render: h => h(App)
})
