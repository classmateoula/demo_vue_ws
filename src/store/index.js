import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'
import { getCache } from '../../static/plug/global'
Vue.use(Vuex)

let state = {
  token: getCache('token'),
  userInfo: JSON.parse(getCache('userInfo') ? getCache('userInfo') : '{}'),
  color: '#2f2f36',
  server: 'http://ws.leimu.xn--6qq986b3xl',
}
for (let i in api) {
  state[i] = api[i]
}
const store = new Vuex.Store({
  // 赋值
  state,
  // 重构
  getters: {
    updUserId (state) {
      return state.userId = 1101
    }
  },
  // 修改
  mutations: {
    setTokenMua (state, val) {
      state.token = val
    },
    setColorMua (state, val) {
      state.color = val
    },
    setUserInfoMua (state, val) {
      state.userInfo = val
    },
  },
  // 监听
  actions: {
    setToken (context, val) {
      context.commit('setTokenMua', val)
    },
    setColor (context, val) {
      context.commit('setColorMua', val)
    },
    setUserInfo (context, val) {
      context.commit('setUserInfoMua', val)
    },
  }
})

export default store
