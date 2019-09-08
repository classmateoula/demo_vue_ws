// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import local from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import Qs from 'qs'
import VueClipboard from 'vue-clipboard2'
import App from './App'
import router from './router'
import store from './store'
import { getCache } from '../static/plug/global'
import '../static/plug/apk'
import luoUI from './components/luo-ui'
import 'element-ui/lib/theme-chalk/index.css'

axios.defaults.baseURL = 'http://api.leimu.xn--6qq986b3xl'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [
  function (data) {
    if (data) {
      data.uid = getCache('userId')
      return Qs.stringify(data)
    }
  }
]
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

Vue.prototype.errFun = function (err, msg) {
  console.log(err)
  this.$loading().close()
  this.$router.push('/404')
  // this.$message({
  //   type: 'error',
  //   message: msg || '系统更新，请稍后再试'
  // })
}
Vue.prototype.warnFun = function (err, msg) {
  console.log(err)
  this.$message({
    type: 'warning',
    message: msg || err || '请求失败'
  })
}

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
