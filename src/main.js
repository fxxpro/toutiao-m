import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import './styles/index.less'
import '@/utils/dayjs'
import 'amfe-flexible'

import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

Vue.prototype.$http = axios
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
