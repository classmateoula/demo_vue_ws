const baseUrl = 'http://192.168.1.102:3000/api'
const wsUrl = 'ws://192.168.1.102:9000/'
const get_room_list = baseUrl + '/get/room_list'
const ws_msg_post = baseUrl + '/post/add_msg'
const ws_msg_get = baseUrl + '/get/msg_list'
const get_user_info = baseUrl + '/get/user_info'


export {
  baseUrl,
  wsUrl,
  get_room_list,
  ws_msg_post,
  get_user_info,
  ws_msg_get,
}
