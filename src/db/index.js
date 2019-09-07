
module.exports = function (url, data = {}) {
  return new Promise((resolve, rej) => {
    require('./' + url + '.js')(data).then((res) => {
      return resolve(res)
    }).catch(err => {
      return rej(err)
    })
  })
}
