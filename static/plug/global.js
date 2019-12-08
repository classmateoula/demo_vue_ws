import COS from 'cos-js-sdk-v5'
import { Message } from 'element-ui'
// 公共数据
const globalData = {
  imgUrl: 'https://luo-1257979020.file.myqcloud.com/',
  cacheType: 'local', // session浏览器缓存 local本地缓存
  appliance: window.navigator.userAgent.toLowerCase(),
  version: '1.2.5',
  config: {
    Bucket: 'luo-1257979020',
    Region: 'ap-chengdu'
  }
}

let cos = new COS({
  SecretId: 'AKIDkLjuuhNenmcFfs9eFaeS0IPGrCG4euwm',
  SecretKey: 'qUv995sSoxtcCYjhS2QaZLuFNH2e2DBv',
});

// 编辑公共数据
export function set (key, val) {
  globalData[key] = val
}

// 获取公共数据
export function get (key) {
  return globalData[key]
}

// 文字过滤
export function textFilter (val, max, now) {
  val = val || ''
  if (val.length > max) {
    val = val.slice(0, (max - 1) || now) + '...'
  }
  return val
}

// 金钱过滤
export function moneyFilter (val, max) {
  val = (Number(val) / 100).toFixed(max || 2)
  return isNaN(val) ? 0 : val
}

// 设置缓存
function setCacheType () {
  if (globalData.cacheType === 'session') {
    return window.sessionStorage
  }
  if (globalData.cacheType === 'local') {
    return window.localStorage
  }
  console.log('缓存类型有误！！！')
}

export function setCache (key, val) {
  return setCacheType().setItem(key, val)
}
export function getCache (key) {
  return setCacheType().getItem(key)
}
export function removeCache (key) {
  return setCacheType().removeItem(key)
}

// 下载图片
export function downloadFile (url) {
  let a = document.createElement('a')
  a.href = url
  a.target = 'download'
  a.click()
}

// 上传图片
export function uploadFile (file) {
  return new Promise((resolve, reject) => {
    let key = parseInt(new Date() / 24 * 60 * 60000).toString(16) + '/' + parseInt(new Date() / 1 % (24 * 60 * 60000)).toString(16) + '/' + file.name
    cos.putObject({
      Bucket: globalData.config.Bucket,
      Region: globalData.config.Region,
      Key: key,
      Body: file,
      onProgress: res => {
        if (res.percent === 1) {
          Message({
            type: 'success',
            message: '上传成功'
          })
          resolve(globalData.imgUrl + key)
        } else {
          Message({
            type: 'info',
            message: '已上传' + parseInt(res.percent * 100) + '%'
          })
        }
      }
    }, (err) => {
      if (err) {
        reject(err)
      }
    })
  })
}
