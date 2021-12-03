import Vue from 'vue'
import App from './App.vue'
import coms from './index.js'

Vue.config.productionTip = false
coms.install(Vue)

new Vue({
  render: h => h(App)
}).$mount('#app')
