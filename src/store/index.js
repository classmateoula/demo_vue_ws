import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'
Vue.use(Vuex)

let state = {
  userId: null,
  userInfo: {},
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
    setUserIdMua (state, val) {
      state.userId = val
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
    setUserId (context, val) {
      context.commit('setUserIdMua', val)
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
