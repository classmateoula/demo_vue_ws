import { axios } from './index'

// 获取房间列表
export function get_room_list (data) {
  return axios({
    url: '/get/room_list',
    method: 'post',
    data
  })
}

// 获取消息列表
export function get_msg_list (data) {
  return axios({
    url: '/get/msg_list',
    method: 'post',
    data
  })
}

// 新增消息
export function post_add_msg (data) {
  return axios({
    url: '/post/add_msg',
    method: 'post',
    data
  })
}

// 新增房间
export function post_room_add (data) {
  return axios({
    url: '/post/room/add',
    method: 'post',
    data
  })
}
