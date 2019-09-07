const connection = require('../common')
connection.connect()

module.exports = function (data) {
  var sql = `INSERT INTO msg_list(msg, img, uid, uname, rid, time) VALUES ('${data.msg}','${data.img}','${data.uid}','${data.uname}','${data.rid}', '${new Date().getTime()}')`
  return new Promise((resolve, rej) => {
    connection.query(sql, function (err, res) {
      return err ? rej(err) : resolve(res)
    })
  })
}