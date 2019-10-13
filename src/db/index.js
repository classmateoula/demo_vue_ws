const connection = require('./common')
connection.connect()

let [sql, token, tokens, tokenIndex] = ['', '', [], 0]
module.exports = function (url, data = {}) {
  return new Promise((resolve, rej) => {
    console.log(tokens)
    tokenIndex = tokens.map(val => val.token).indexOf(data.token)
    if (url != '/post/login' && (tokenIndex === -1 || tokens[tokenIndex].t - new Date() < 0) || tokens.length > 1000) {
      return rej('未登陆')
    }
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
      // 获取用户表-按手机号/昵称
      case '/get/user_list':
        sql = `SELECT uname, avatar, tel, status, uid FROM user_list WHERE tel='${data.name}' OR uname='${data.name}'`
        break
      // 添加好友
      case '/add/friend':
        sql = `SELECT user_ids from user_list WHERE token='${data.token}'`
        connection.query(sql, (err, res) => {
          if (!err && res[0]) {
            let ids = res[0].user_ids.split(',')
            ids.push(data.uid)
            connection.query(`UPDATE user_list SET user_ids='${ids.join(',')}' WHERE token='${token}'`, error => {
              return error ? rej(error) : resolve('添加成功')
            })
          }
        })
        break
      // 申请添加好友
      case '/add/friend/apply':
        sql = `SELECT * FROM user_list from token='${data.token}'`
        break
      // 获取用户好友列表
      case '/get/friend_list':
        sql = `SELECT uname, avatar, tel, status, uid, user_ids FROM user_list`
        connection.query(sql, (err, res) => {
          return err ? rej(err) : resolve(res.filter(val => data.user_ids.split(',').includes(val.uid.toString())))
        })
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
        let d = new Date().getTime() % 100000
        sql = `(SELECT uname, avatar, tel, status, uid, user_ids FROM user_list WHERE tel='${data.tel}'` + (data.type == 1 ? ` AND upwd='${data.upwd}' AND dev='${data.dev}')` : ')')
        connection.query(sql, function (error, result) {
          if (data.type == 1) {
            if (error || result.length === 0) {
              return rej('登录失败')
            } else {
              let res = new Object(result[0])
              token = Buffer.from(d + data.tel + data.upwd + data.dev).toString('base64').slice(0, 24)
              tokens.push({
                token: token,
                id: res.uid,
                t: new Date().getTime() + 24 * 60 * 60 * 1000
              })
              connection.query(`UPDATE user_list SET token='${token}' WHERE uid='${res.uid}'`, err => {
              })
              res.token = token
              return resolve(res)
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
