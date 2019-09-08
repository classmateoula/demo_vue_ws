const connection = require('./common')
connection.connect()

let sql = ''
module.exports = function (url, data = {}) {
  return new Promise((resolve, rej) => {
    console.log(url)
    switch (url) {
      // 获取房间列表
      case '/get/room_list':
        sql = 'SELECT * FROM room_list'
        connection.query(sql, function (error, result) {
          let res = result.filter(val => val.users && val.users.split(',').indexOf(data.uid) != -1)
          return error ? rej(error) : resolve(res)
        })
        break
      // 获取用户详情
      case '/get/user_info':
        sql = `SELECT * FROM user_list WHERE uid='${data.uid}'`
        connection.query(sql, function (error, result) {
          return error || !result[0] ? rej(error || '请求失败') : resolve(result[0])
        })
        break
      // 获取消息列表
      case '/get/msg_list':
        sql = `SELECT * FROM msg_list WHERE rid=${data.rid}`
        break
      // 新增消息
      case '/post/add_msg':
        sql = `INSERT INTO msg_list(msg, img, uid, uname, rid, time, user_img) VALUES ('${data.msg}','${data.img}','${data.uid}','${data.uname}','${data.rid}', '${new Date().getTime()}', '${data.user_img}')`
        break
      // 登录
      case '/post/login':
        sql = `(SELECT uid FROM user_list WHERE tel='${data.tel}' AND upwd='${data.upwd}' AND dev='${data.dev}')`
        connection.query(sql, function (error, result) {
          return error || result.length === 0 ? rej(error || '登录失败！') : resolve(result[0])
        })
        break
    }
    if (!sql) {
      return rej('服务更新')
    }
    connection.query(sql, function (err, res) {
      return err ? rej(err) : resolve(res)
    })
  })
}
