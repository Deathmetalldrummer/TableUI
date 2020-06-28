import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ClickOutside } from './directive/click-outside'

Vue.config.productionTip = false
Vue.directive('click-outside', ClickOutside)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
