import { axios } from './index.js'

// 登录 / 注册 获取用户信息
export function post_login (data) {
  return axios({
    url: '/post/login',
    method: 'post',
    data
  })
}

// 退出登陆
export function post_logout (data) {
  return axios({
    url: '/post/logout',
    method: 'post',
    data
  })
}
