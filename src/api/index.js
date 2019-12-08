import axios from 'axios'
import { getCache } from '../../static/plug/global'
import Qs from 'qs'
import router from '../router'
import { Loading, Message } from 'element-ui'

let load

const baseUrl = window.location.port == 3821
  ? 'http://localhost:3000/api'
  : 'https://node-api.luoschool.cn/api'
const wsUrl = window.location.port == 3821
  ? 'ws://localhost:9001'
  : 'wss://node-ws.luoschool.cn'

axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [
  function (data) {
    if (data) {
      return Qs.stringify(data)
    }
  }
]

axios.interceptors.request.use(config => {
  load = Loading.service({ text: '加载中...' })
  switch (config.method) {
    case 'get':
      break
    default:
      if (config.data) {
        config.data.token = getCache('token')
      } else {
        config.data = { token: getCache('token') }
      }
      break
  }
  return config
})

axios.interceptors.response.use(req => {
  load.close()
  if (req.data.code === 401) {
    Message.warning('登录过期')
    router.push('/login')
  } else if (req.data.code === 400) {
    Message.warning(req.data.msg)
  }
  return req.data
}, err => {
  console.log(err)
  router.push('/404')
  load.close()
})

export {
  baseUrl,
  wsUrl,
  axios
}
