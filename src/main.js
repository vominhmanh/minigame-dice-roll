import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
new Vue({
  render: h => h(App),
}).$mount('#app')
