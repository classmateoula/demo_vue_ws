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

// 获取用户列表 {name: '用户名或手机号'}
export function get_user_list (data) {
  return axios({
    url: '/get/user_list',
    method: 'post',
    data
  })
}

// 获取用户列表 {name: '用户名或手机号'}
export function add_friend (data) {
  return axios({
    url: '/add/friend',
    method: 'post',
    data
  })
}

// 申请好友
export function add_friend_apply (data) {
  return axios({
    url: '/add/friend/apply',
    method: 'POST',
    data
  })
}

// 获取好友列表
export function get_friend_list (data) {
  return axios({
    url: '/get/friend_list',
    method: 'POST',
    data
  })
}

// 修改用户头像
export function update_user_img (data) {
  return axios({
    method: 'POST',
    url: '/update/user/img',
    data
  })
}
