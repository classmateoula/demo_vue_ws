// 公共数据
const globalData = {
  imgUrl: 'https://1084209545-1256998482.cos-website.ap-chengdu.myqcloud.com',
  cacheType: 'local', // session浏览器缓存 local本地缓存
  appliance: window.navigator.userAgent.toLowerCase(),
  version: '1.2.5'
}

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

// 上传文件名设置
export function cosUrlEncrypt (val) {
  val = (new Date() / 1).toString(7) + val
  return val
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
// 上传图片
export function uploadFile (path) {
  return new Promise((resolve, reject) => {
    // let key = path.slice(path.lastIndexOf('/'))
    // cos.postObject({
    //   Bucket: globalData.config.Bucket,
    //   Region: globalData.config.Region,
    //   Key: key,
    //   FilePath: path,
    //   onProgress: res => {
    //     if (res.percent === 1) {
    //       this.$message({
    //         type: 'success',
    //         message: '上传成功'
    //       })
    //       globalData.imgUrl + key ? resolve(globalData.imgUrl + key) : console.error('上传失败')
    //       // reject('上传失败')
    //     } else {
    //       this.$message({
    //         type: 'info',
    //         message: '已上传' + parseInt(res.percent * 100) + '%'
    //       })
    //     }
    //   }
    // })
  })
}
