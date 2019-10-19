// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import local from 'element-ui/lib/locale/lang/en'
import VueClipboard from 'vue-clipboard2'
import App from './App'
import router from './router'
import store from './store'
import '../static/plug/apk'
import luoUI from './components/luo-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { axios } from './api/index'

// axios.defaults.withCredentials = true
Vue.prototype.$http = axios

Vue.use(ElementUI, {size: 'small', zIndex: 99, local})
Vue.use(luoUI)
Vue.use(VueClipboard)

// 金额过滤器
Vue.filter('money', function (val, dec) {
  if (!val || isNaN(val / 1)) return '0'
  val = Number(val).toFixed(dec || 2)
  return val
})
// 时间过滤器
Vue.filter('time', function (val) {
  if (!val || isNaN(val / 1)) return ''
  let t = new Date(val / 1)
  console.log(t)
  return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
})

Vue.config.productionTip = false
// Vue.use(VueSocket)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
