import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/screen/home' // 首页
import Space from '@/screen/space' // 空间
import Mail from '@/screen/mail' // 通讯录
import User from '@/screen/user' // 我的

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/mail',
      component: Mail
    }, {
      path: '/space',
      component: Space
    }, {
      path: '/user',
      component: User
    }
  ]
})
