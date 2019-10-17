import axios from 'axios'
import { getCache } from '../../static/plug/global'
import Qs from 'qs'
import router from '../router'
import { Loading, Message } from 'element-ui'

let load

const baseUrl = window.location.port != '3821' ? 'http://127.0.0.1:3000/api' : 'http://node-api.leimu.xn--6qq986b3xl/api'
const wsUrl = window.location.port != '3821' ? 'ws://127.0.0.1:9001' : 'ws://node-ws.leimu.xn--6qq986b3xl'

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
      console.log('get')
      break
    default:
      if (config.data) {
        config.data.token = getCache('token')
      } else {
        config.data = { token: getCache('token') }
      }
      console.log(config)
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
  load.close()
})

export {
  baseUrl,
  wsUrl,
  axios
}
