const connection = require('../common')
connection.connect()
var sql = 'SELECT * FROM msg_list'

module.exports = function (data) {
  console.log(data)
  return new Promise((resolve, rej) => {
    connection.query(sql, function (err, res) {
      return err ? rej(err) : resolve(res)
    })
  })
}