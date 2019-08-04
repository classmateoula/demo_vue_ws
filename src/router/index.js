import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/screen/index' // 导航
import Home from '@/screen/home/index' // 首页
import Space from '@/screen/space/index' // 空间
import Mail from '@/screen/mail/index' // 通讯录
import User from '@/screen/user/index' // 我的
import Theme from '@/screen/theme/index' // 主题
import Search from '@/screen/search/index' // 搜索
import Room from '@/screen/home/room' // 房间
import Welcome from '@/screen/welcome/index' // 房间

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      redirect: '/home',
      component: Index,
      children: [
        {
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
        },
      ]
    }, {
      path: '/theme',
      component: Theme
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/room',
      component: Room
    }, {
      path: '/welcome',
      component: Welcome
    }
  ]
})
