import Vue from 'vue'
import Router from 'vue-router'
// import VueResource from 'vue-resource'

import PageIndex from '../components/layout.vue'
import ClickBox from '../views/comfirm/ClickButton.vue'

// Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
    path: '/',
    component : PageIndex,
    name : 'PageIndex'
    },
    {
      path: '/box',
      component: ClickBox,
      name: 'ClickBox'
    }
  ]
})
