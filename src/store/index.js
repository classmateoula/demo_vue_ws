import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 赋值
  state: {
    userId: null,
    color: '#d2b6e5',
  },
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
  },
  // 监听
  actions: {
    setUserId (context, val) {
      context.commit('setUserIdMua', val)
    },
    setColor (context, val) {
      context.commit('setColorMua', val)
    },
  }
})

export default store
