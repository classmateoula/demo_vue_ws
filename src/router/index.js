import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/screen/index' // 导航
import ErrPath from '@/screen/404' // 错误页面
import Home from '@/screen/home/index' // 首页
import Space from '@/screen/space/index' // 空间
import Mail from '@/screen/mail/index' // 通讯录
import User from '@/screen/user/index' // 我的
import Theme from '@/screen/theme/index' // 主题
import Search from '@/screen/search/index' // 搜索
import Room from '@/screen/home/room' // 房间
import Welcome from '@/screen/welcome/index' // 房间
import Login from '@/screen/login' // 登录
import Setting from '@/screen/setting' // 设置
import Version from '@/screen/version' // 关于罗家机密 版本更新
import Friend from '@/screen/mail/friend' // 添加好友

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      name: 'index',
      // redirect: '/home',
      component: Index,
      // children: [
      //   {
      //     path: '/home',
      //     component: Home
      //   }, {
      //     path: '/mail',
      //     component: Mail
      //   }, {
      //     path: '/space',
      //     component: Space
      //   }, {
      //     path: '/user',
      //     component: User
      //   },
      // ]
    }, {
      path: '/add_group',
      component: () => import('@/screen/home/add_group')
    }, {
      path: '/theme',
      component: Theme
    }, {
      path: '/search',
      component: Search
    }, {
      path: '/room',
      name: 'room',
      component: Room
    }, {
      path: '/welcome',
      component: Welcome
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/version',
      component: Version
    }, {
      path: '/friend',
      component: Friend
    }, {
      path: '/404',
      component: ErrPath
    }
  ]
})
