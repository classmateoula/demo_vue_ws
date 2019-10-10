import axios from 'axios'
import { getCache } from '../../static/plug/global'
import Qs from 'qs'
import router from '../router'


const baseUrl = window.location.port === '3821' ? 'http://127.0.0.1:3000/api' : 'http://wsapi.leimu.xn--6qq986b3xl'
const wsUrl = window.location.port === '3821' ? 'ws://127.0.0.1:9000' : 'ws://wsapi.leimu.xn--6qq986b3xl'

axios.defaults.baseURL = 'http://api.leimu.xn--6qq986b3xl'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [
  function (data) {
    if (data) {
      data.uid = getCache('userId')
      return Qs.stringify(data)
    }
  }
]

axios.interceptors.response.use(req => {
  if (req.data.code === 401) {
    // router.push('/login')
  }
})


const get_room_list = baseUrl + '/get/room_list'
const ws_msg_post = baseUrl + '/post/add_msg'
const ws_msg_get = baseUrl + '/get/msg_list'
const get_user_info = baseUrl + '/get/user_info'

class $http extends axios {

}

export {
  baseUrl,
  wsUrl,
  get_room_list,
  ws_msg_post,
  get_user_info,
  ws_msg_get,
  axios
}
