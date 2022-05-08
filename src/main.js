import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

//
import {B} from '../packages/index'
//Vue.use(B)
//console.log(window.B)
console.log(B)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
