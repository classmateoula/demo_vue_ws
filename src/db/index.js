const connection = require('./common')
connection.connect()

let [sql, token, tokens, tokenIndex] = ['', '', [], 0]
module.exports = function (url, data = {}) {
  return new Promise((resolve, rej) => {
    tokenIndex = tokens.map(val => val.token).indexOf(data.token)
    if (url != '/post/login' && (tokenIndex === -1 || tokens[tokenIndex].t - new Date() < 0) || tokens.length > 1000) {
      return rej('未登陆')
    }
    console.log(tokens)
    switch (url) {
      // 获取房间列表
      case '/get/room_list':
        sql = 'SELECT * FROM room_list'
        connection.query(sql, function (error, result) {
          let res = result.filter(val => val.users && val.users.split(',').includes(tokens[tokenIndex].id.toString()))
          return error ? rej(error) : resolve(res)
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
      case '/post/logout':
        tokens.splice(tokens.map(val => val.token).indexOf(data.token), 1)
        return resolve('退出登陆')
      case '/post/login':
        token = Buffer.from(data.tel + data.upwd + data.dev).toString('base64').slice(0, 16)
        sql = `(SELECT * FROM user_list WHERE tel='${data.tel}'` + (data.type == 1 ? ` AND upwd='${data.upwd}' AND dev='${data.dev}')` : ')')
        connection.query(sql, function (error, result) {
          if (data.type == 1) {
            if (error) {
              return rej('登录失败')
            } else {
              result[0].token = token
              tokens.push({
                token,
                id: result[0].uid,
                t: new Date().getTime() + 24 * 60 * 60 * 1000
              })
              return resolve(result[0])
            }
          } else {
            if (!error && result.length === 0) {
              connection.query(`INSERT INTO user_list(upwd, dev, tel) VALUES ('${data.upwd}', '${data.dev}', '${data.tel}')`, (err, res) => {
                return err ? rej(err) : resolve(res)
              })
            } else {
              return rej('已被注册')
            }
          }
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
