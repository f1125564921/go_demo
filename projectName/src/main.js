import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import Header from './views/page_demo/Header.vue'
// import Aside from './views/page_demo/Aside.vue'
// import Footer from './views/page_demo/Footer.vue'
// import Main from './views/page_demo/Main.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// Vue.component('header-h', Header)
// Vue.component('aside-a', Aside)
// Vue.component('footer-f', Footer)
// Vue.component('main-m', Main)

import $conf from './common/config/config.js'
import axios from 'axios'

Vue.prototype.$conf = $conf
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
